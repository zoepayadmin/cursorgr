#!/usr/bin/env python3
"""
Extrai todos os produtos da categoria Ração Seca (cachorro) da Petlove.

Usa a API Algolia do catálogo (índice `variants`, coleção
`cachorro/racoes/racao-seca`) — 1077 produtos com título, descrição,
imagens HD, preços e URL.
"""
from __future__ import annotations

import argparse
import csv
import json
import re
import time
import zipfile
from pathlib import Path
from urllib.parse import urljoin

import requests

ALGOLIA_APP_ID = "1VGI1WDH1E"
ALGOLIA_API_KEY = "9c9a8ce87ca4906243ade6aece7dc7cb"
ALGOLIA_INDEX = "variants"
COLLECTION_FILTER = "collections:cachorro/racoes/racao-seca"
CATEGORY_URL = "https://www.petlove.com.br/cachorro/racoes/racao-seca"
BASE_URL = "https://www.petlove.com.br"
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)


def fetch_all_variants() -> list[dict]:
    url = f"https://{ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/{ALGOLIA_INDEX}/query"
    headers = {
        "X-Algolia-Application-Id": ALGOLIA_APP_ID,
        "X-Algolia-API-Key": ALGOLIA_API_KEY,
        "Content-Type": "application/json",
    }
    all_hits: list[dict] = []
    page = 0
    while True:
        body = {
            "query": "",
            "hitsPerPage": 1000,
            "page": page,
            "facetFilters": [COLLECTION_FILTER],
        }
        resp = requests.post(url, headers=headers, json=body, timeout=90)
        resp.raise_for_status()
        data = resp.json()
        all_hits.extend(data.get("hits", []))
        nb_pages = data.get("nbPages", 1)
        print(f"  Página Algolia {page + 1}/{nb_pages} — {len(all_hits)} produtos")
        page += 1
        if page >= nb_pages:
            break
        time.sleep(0.2)
    return all_hits


def pick_images(images: dict | None) -> dict[str, list[str]]:
    if not images or not isinstance(images, dict):
        return {"hd_large": [], "hd": [], "large": [], "product": []}
    return {
        "hd_large": images.get("hd_large") or [],
        "hd": images.get("hd") or [],
        "large": images.get("large") or [],
        "product": images.get("product") or [],
    }


def normalize_hit(hit: dict) -> dict:
    images = pick_images(hit.get("images"))
    imagens_principais = images["hd_large"] or images["hd"] or images["large"] or []
    if not imagens_principais and hit.get("image"):
        imagens_principais = [hit["image"]]

    path = hit.get("path") or f"/{hit.get('slug', '')}/p"
    product_url = urljoin(BASE_URL, path)
    if hit.get("sku"):
        sep = "&" if "?" in product_url else "?"
        product_url = f"{product_url}{sep}sku={hit['sku']}"

    prices = hit.get("prices") or {}
    preco = prices.get("list") or prices.get("price")
    preco_clube = prices.get("discount_club") or prices.get("club_price")
    preco_original = prices.get("original") or prices.get("list_price")
    preco_assinante = prices.get("subscriber")

    categories = hit.get("categories") or []
    cat_str = ""
    if categories and isinstance(categories[0], dict):
        cat_str = " > ".join(
            filter(
                None,
                [
                    categories[0].get("lvl0"),
                    categories[0].get("lvl1"),
                    categories[0].get("lvl2"),
                ],
            )
        )

    return {
        "sku": hit.get("sku"),
        "object_id": hit.get("objectID"),
        "titulo": hit.get("name") or hit.get("short_name"),
        "titulo_curto": hit.get("short_name"),
        "descricao": (hit.get("information") or "").strip(),
        "marca": hit.get("brand"),
        "categoria": hit.get("category"),
        "categorias_hierarquia": cat_str,
        "preco": preco,
        "preco_clube": preco_clube,
        "preco_original": preco_original,
        "preco_assinante": preco_assinante,
        "desconto_percentual": hit.get("discount"),
        "avaliacao": hit.get("rating"),
        "total_avaliacoes": hit.get("rating_count"),
        "em_estoque": hit.get("in_stock"),
        "codigo_barras": hit.get("barcode"),
        "slug": hit.get("slug"),
        "url": product_url,
        "imagem_principal": hit.get("image"),
        "imagens_hd_large": images["hd_large"],
        "imagens_hd": images["hd"],
        "imagens_large": images["large"],
        "imagens_product": images["product"],
        "imagens_todas": imagens_principais,
        "group_id": hit.get("group_id"),
        "tags": hit.get("tags"),
    }


def download_images_playwright(products: list[dict], out_dir: Path) -> None:
    from playwright.sync_api import sync_playwright

    out_dir.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=False,
            args=["--no-sandbox", "--disable-blink-features=AutomationControlled"],
        )
        page = browser.new_context(user_agent=USER_AGENT, locale="pt-BR").new_page()
        page.goto(CATEGORY_URL, wait_until="domcontentloaded", timeout=120000)
        page.wait_for_timeout(5000)

        for i, prod in enumerate(products, 1):
            sku = str(prod.get("sku") or i)
            folder = out_dir / re.sub(r"[^\w\-]", "_", sku)
            folder.mkdir(exist_ok=True)
            for j, img_url in enumerate(prod.get("imagens_hd_large") or []):
                ext = Path(img_url.split("?")[0]).suffix or ".png"
                dest = folder / f"{j:02d}{ext}"
                if dest.exists():
                    continue
                try:
                    resp = page.request.get(img_url, timeout=60000)
                    if resp.ok:
                        dest.write_bytes(resp.body)
                except Exception as exc:
                    print(f"    [{sku}] {exc}")
            if i % 50 == 0:
                print(f"  Imagens: {i}/{len(products)}")
        browser.close()


def write_csv(products: list[dict], path: Path) -> None:
    fields = [
        "sku",
        "titulo",
        "descricao",
        "marca",
        "categoria",
        "preco",
        "preco_clube",
        "preco_original",
        "preco_assinante",
        "avaliacao",
        "total_avaliacoes",
        "em_estoque",
        "url",
        "imagens_todas",
    ]
    with path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        for p in products:
            row = dict(p)
            row["imagens_todas"] = " | ".join(p.get("imagens_todas") or [])
            writer.writerow(row)


def create_zip(output_dir: Path, zip_path: Path) -> None:
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for file in output_dir.rglob("*"):
            if file.is_file():
                zf.write(file, file.relative_to(output_dir.parent))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output-dir", default="/workspace/output/petlove-racao-seca")
    parser.add_argument("--download-images", action="store_true")
    args = parser.parse_args()

    out_dir = Path(args.output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    print("Buscando produtos na API Algolia...")
    products = [normalize_hit(h) for h in fetch_all_variants()]
    print(f"Total: {len(products)} produtos")

    payload = {
        "categoria_url": CATEGORY_URL,
        "colecao": "cachorro/racoes/racao-seca",
        "total": len(products),
        "extraido_em": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "produtos": products,
    }

    json_path = out_dir / "produtos.json"
    json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    write_csv(products, out_dir / "produtos.csv")

    (out_dir / "LEIA-ME.txt").write_text(
        f"""Exportação Petlove — Ração Seca para Cachorro
Total: {len(products)} produtos
Categoria: {CATEGORY_URL}

Arquivos:
- produtos.json — dados completos
- produtos.csv  — planilha (Excel/Sheets)

Imagens: URLs em imagens_hd_large / imagens_todas
Para baixar arquivos de imagem localmente:
  python3 scripts/scrape_petlove.py --download-images
""",
        encoding="utf-8",
    )

    if args.download_images:
        print("Baixando imagens...")
        download_images_playwright(products, out_dir / "imagens")

    zip_path = out_dir.parent / "petlove-racao-seca.zip"
    create_zip(out_dir, zip_path)
    print(f"JSON: {json_path}")
    print(f"CSV: {out_dir / 'produtos.csv'}")
    print(f"ZIP: {zip_path} ({zip_path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
