import Link from 'next/link';
import { getAllRoasts } from '@/content/roasts';

export default function Home() {
  const roasts = getAllRoasts();

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="min-h-[50vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-20 pb-16 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(196, 30, 58, 0.12) 0%, transparent 50%)'
          }}
        />

        <p className="label text-[var(--red)] mb-6 opacity-0 animate-fade-up">
          Strategic Document Analysis
        </p>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.05] mb-6 max-w-[14ch]">
          <span className="block opacity-0 animate-fade-up delay-100">The</span>
          <span className="block opacity-0 animate-fade-up delay-200">
            <em className="text-[var(--red)]">Roaster</em>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-[var(--gray-light)] max-w-[50ch] opacity-0 animate-fade-up delay-300">
          Every business document is two documents: what they wrote, and what they couldn&apos;t say.
          We read the second one.
        </p>

        <div className="mt-8 flex items-center gap-4 opacity-0 animate-fade-up delay-400">
          <div className="w-16 h-[1px] bg-[var(--gray)]" />
          <span className="label text-[var(--gray)]">{roasts.length} Analyses</span>
        </div>
      </section>

      {/* Roasts Grid */}
      <section className="px-6 md:px-16 lg:px-24 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {roasts.map((roast, index) => (
            <Link
              key={roast.slug}
              href={`/roast/${roast.slug}`}
              className="roast-card block"
            >
              <article
                className="h-full p-8 md:p-10 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all relative overflow-hidden group"
                style={{
                  borderColor: `${roast.theme.accent}20`
                }}
              >
                {/* Accent gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 0% 100%, ${roast.theme.accent}15 0%, transparent 50%)`
                  }}
                />

                <div className="relative flex flex-col h-full">
                  <p
                    className="label mb-4"
                    style={{ color: roast.theme.accent }}
                  >
                    {String(index + 1).padStart(2, '0')} / {roast.documentType}
                  </p>

                  <h2 className="font-serif text-2xl md:text-3xl mb-3">
                    {roast.client}
                  </h2>

                  <p className="font-serif text-lg md:text-xl italic text-[var(--gray-light)] mb-6 flex-grow">
                    &ldquo;{roast.unspokenInsecurity}&rdquo;
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                    <span className="label text-[var(--gray)]">
                      {roast.date}
                    </span>
                    <span
                      className="label group-hover:translate-x-1 transition-transform"
                      style={{ color: roast.theme.accent }}
                    >
                      Read →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 lg:px-24 py-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="label text-[var(--gray)]">
            The Roaster / Strategic Analysis
          </p>
          <p className="label text-[var(--gray)]">
            Confidential
          </p>
        </div>
      </footer>
    </main>
  );
}
