import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type InstitutionalLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function InstitutionalLayout({
  title,
  subtitle,
  children,
}: InstitutionalLayoutProps) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
      <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-accent-orange transition-colors">
          Início
        </Link>
        <span className="mx-2">/</span>
        <span className="text-navy font-medium">{title}</span>
      </nav>
      <header className="mb-10 border-b border-gray-200 pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 text-lg text-gray-600">{subtitle}</p>
        ) : null}
      </header>
      <div className="institutional-prose space-y-8 text-gray-700 leading-relaxed">
        {children}
      </div>
    </article>
  );
}

type SectionProps = {
  title: string;
  children: ReactNode;
};

export function PolicySection({ title, children }: SectionProps) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-navy">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function PolicyParagraph({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
