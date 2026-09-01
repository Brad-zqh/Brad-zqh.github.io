import Link from 'next/link';
import type { ReactNode } from 'react';

const policyLinks = [
  { href: '/music-geography/', label: 'Project' },
  { href: '/music-geography/privacy/', label: 'Privacy' },
  { href: '/music-geography/terms/', label: 'Terms' },
  { href: '/music-geography/deletion/', label: 'Deletion' },
];

export function MusicGeographyNav() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
      {policyLinks.map((item) => (
        <Link key={item.href} href={item.href} className="text-neutral-600 hover:text-accent transition-colors">
          {item.label}
        </Link>
      ))}
    </div>
  );
}

interface MusicGeographyShellProps {
  eyebrow: string;
  title: string;
  summary: string;
  children: ReactNode;
}

export default function MusicGeographyShell({ eyebrow, title, summary, children }: MusicGeographyShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-neutral-200/70 bg-gradient-to-br from-cyan-50 via-background to-sky-50 dark:from-cyan-950/20 dark:via-background dark:to-sky-950/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <MusicGeographyNav />
          <p className="mt-10 text-xs font-bold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-primary">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg sm:text-xl leading-8 text-neutral-600">{summary}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {children}
      </div>

      <section className="border-t border-neutral-200/70 bg-neutral-50/60 dark:bg-neutral-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-sm text-neutral-600">
          <div>
            <strong className="text-primary">Music Geography Research Data Collector</strong><br />
            Non-commercial academic research · Zhejiang University
          </div>
          <MusicGeographyNav />
        </div>
      </section>
    </div>
  );
}

export function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-neutral-200/70 bg-card p-6 sm:p-8 shadow-sm">
      <h2 className="text-2xl font-serif font-bold text-primary">{title}</h2>
      <div className="mt-4 space-y-4 text-[1.02rem] leading-7 text-neutral-700">{children}</div>
    </section>
  );
}

export function ExternalPolicyLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4 hover:text-primary">{children}</a>;
}
