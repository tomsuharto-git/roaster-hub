import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRoast, getAllRoasts } from '@/content/roasts';

export function generateStaticParams() {
  const roasts = getAllRoasts();
  return roasts.map((roast) => ({
    slug: roast.slug,
  }));
}

export default async function RoastPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const roast = getRoast(slug);

  if (!roast) {
    notFound();
  }

  const { theme } = roast;

  return (
    <main
      className="min-h-screen"
      style={{
        background: theme.background,
        '--accent': theme.accent,
        '--accent-dark': theme.accentDark,
      } as React.CSSProperties}
    >
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="label text-white hover:opacity-70 transition-opacity">
          ← Back to Hub
        </Link>
        <span className="label text-white/50">Strategic Analysis</span>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${theme.accent}20 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, ${theme.accent}10 0%, transparent 40%)`
          }}
        />

        <p className="label mb-8 opacity-0 animate-fade-up" style={{ color: theme.accent }}>
          {roast.client} / {roast.documentType}
        </p>

        <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl font-normal leading-[1.05] mb-8 max-w-[16ch]">
          <span className="block opacity-0 animate-fade-up delay-100">{roast.heroTitle.line1}</span>
          <span className="block opacity-0 animate-fade-up delay-200">
            <em style={{ color: theme.accent }}>{roast.heroTitle.emphasis}</em>
          </span>
          <span className="block opacity-0 animate-fade-up delay-300">{roast.heroTitle.line2}</span>
        </h1>

        <p className="text-lg md:text-xl text-[var(--gray-light)] max-w-[55ch] opacity-0 animate-fade-up delay-400">
          {roast.surfaceRead}
        </p>

        <div className="absolute bottom-12 left-6 md:left-16 lg:left-24 flex items-center gap-4 opacity-0 animate-fade-up delay-500">
          <div className="w-16 h-[1px]" style={{ background: theme.accent }} />
          <span className="label" style={{ color: `${theme.accent}80` }}>Scroll to explore</span>
        </div>
      </section>

      {/* Core Truth */}
      <section className="px-6 md:px-16 lg:px-24 py-24">
        <p className="label mb-4" style={{ color: theme.accent }}>01 — The Core Truth</p>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8 max-w-[20ch]">
          {roast.unspokenInsecurity}
        </h2>
      </section>

      {/* Truth Cards */}
      <section className="px-6 md:px-16 lg:px-24 py-16">
        <p className="label mb-4" style={{ color: theme.accent }}>02 — What They&apos;re Not Saying</p>
        <h2 className="font-serif text-2xl md:text-3xl mb-12">
          {roast.truths.length} truths buried in the document
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roast.truths.map((truth) => (
            <article
              key={truth.number}
              className="p-8 border transition-all hover:-translate-y-1"
              style={{
                borderColor: `${theme.accent}20`,
                background: `${theme.background}80`
              }}
            >
              <p className="label mb-4" style={{ color: theme.accent }}>
                Truth {truth.number}
              </p>
              <h3 className="font-serif text-xl mb-4">{truth.title}</h3>
              <p className="text-[var(--gray-light)] text-sm leading-relaxed">
                {truth.content}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Insight Banner */}
      <section
        className="px-6 md:px-16 lg:px-24 py-16 my-12"
        style={{ background: theme.accent }}
      >
        <p className="label mb-4 text-white/50">03 — The Insight</p>
        <p className="font-serif text-xl md:text-2xl lg:text-3xl italic text-white max-w-[40ch]">
          {roast.insight}
        </p>
      </section>

      {/* Tension */}
      <section
        className="px-6 md:px-16 lg:px-24 py-24"
        style={{
          background: `linear-gradient(180deg, ${theme.background} 0%, ${theme.accent}08 50%, ${theme.background} 100%)`
        }}
      >
        <p className="label mb-4" style={{ color: theme.accent }}>04 — The Tension</p>
        <h2 className="font-serif text-2xl md:text-3xl mb-12">Caught between two worlds</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          <div className="p-8 border" style={{ borderColor: `${theme.accent}30` }}>
            <h3 className="font-serif text-xl mb-4">{roast.tension.left.title}</h3>
            <p className="text-[var(--gray-light)]">{roast.tension.left.description}</p>
          </div>
          <div className="p-8 border" style={{ borderColor: `${theme.accent}30` }}>
            <h3 className="font-serif text-xl mb-4">{roast.tension.right.title}</h3>
            <p className="text-[var(--gray-light)]">{roast.tension.right.description}</p>
          </div>
        </div>
      </section>

      {/* Real Problem */}
      <section className="min-h-[70vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24">
        <p className="label mb-4" style={{ color: theme.accent }}>05 — The Problem</p>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-8 max-w-[18ch] leading-tight">
          {roast.realProblem.headline.split(/(\*[^*]+\*)/).map((part, i) =>
            part.startsWith('*') && part.endsWith('*') ? (
              <em key={i} style={{ color: theme.accent }}>{part.slice(1, -1)}</em>
            ) : (
              part
            )
          )}
        </h2>
        <p className="text-lg md:text-xl text-[var(--gray-light)] max-w-[55ch]">
          {roast.realProblem.subtext}
        </p>
      </section>

      {/* Question Avoiding */}
      <section className="px-6 md:px-16 lg:px-24 py-16">
        <p className="label mb-4" style={{ color: theme.accent }}>06 — The Question They&apos;re Avoiding</p>
        <blockquote
          className="font-serif text-2xl md:text-3xl italic pl-8 border-l-2 max-w-[35ch]"
          style={{ borderColor: theme.accent }}
        >
          {roast.questionAvoiding}
        </blockquote>
      </section>

      {/* Way Through */}
      <section
        className="px-6 md:px-16 lg:px-24 py-24"
        style={{ background: 'var(--cream)', color: 'var(--black)' }}
      >
        <p className="label mb-4" style={{ color: theme.accentDark }}>07 — The Way Through</p>
        <h2 className="font-serif text-2xl md:text-3xl mb-8">{roast.wayThrough.headline}</h2>
        <p className="text-lg mb-12 max-w-[55ch]" style={{ color: 'var(--gray)' }}>
          {roast.wayThrough.body}
        </p>

        <div className="space-y-6 max-w-[50ch]">
          {roast.wayThrough.questions.map((question, i) => (
            <p
              key={i}
              className="font-serif text-xl italic pl-6 border-l-2"
              style={{ borderColor: theme.accent }}
            >
              {question}
            </p>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 lg:px-24 py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="label text-[var(--gray)]">
          {roast.client} Analysis / {roast.date}
        </p>
        <p className="label text-[var(--gray)]">Confidential</p>
      </footer>
    </main>
  );
}
