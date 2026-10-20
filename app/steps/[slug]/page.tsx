import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SectionReveal } from '@/components/section-reveal'
import { getPauseGuide, pauseGuides } from '@/lib/pause-guides'

export function generateStaticParams() {
  return pauseGuides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = getPauseGuide(slug)
  if (!guide) return {}
  return {
    title: `${guide.title} · Kind Pause`,
    description: guide.intro,
  }
}

export default async function StepGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const index = pauseGuides.findIndex((guide) => guide.slug === slug)
  if (index === -1) notFound()

  const guide = pauseGuides[index]
  const previous = pauseGuides[index - 1]
  const next = pauseGuides[index + 1]

  return (
    <>
      <SiteHeader />
      <main>
        <section aria-labelledby="guide-heading" className="mx-auto w-full max-w-3xl px-6 pb-16 pt-10 md:pt-16">
          <Link
            href="/#how-it-works"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to your pause
          </Link>
          <p className="mt-10 font-serif text-sm text-pink">Step {guide.number} of 03</p>
          <h1 id="guide-heading" className="mt-3 text-balance font-serif text-4xl tracking-tight md:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-4 font-serif text-xl italic text-brand md:text-2xl">{guide.prompt}</p>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">{guide.intro}</p>
        </section>

        <section aria-labelledby="why-heading" className="bg-pink-soft">
          <SectionReveal message="Here is why this helps…" className="mx-auto w-full max-w-3xl px-6 py-16">
            <h2 id="why-heading" className="font-serif text-2xl tracking-tight md:text-3xl">
              Why this helps
            </h2>
            <ul className="mt-6 flex flex-col gap-4">
              {guide.why.map((reason) => (
                <li key={reason} className="flex gap-3 leading-relaxed">
                  <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-pink" />
                  {reason}
                </li>
              ))}
            </ul>
          </SectionReveal>
        </section>

        <section aria-labelledby="practice-heading">
          <SectionReveal message="Take it one small step at a time…" className="mx-auto w-full max-w-3xl px-6 py-16">
            <h2 id="practice-heading" className="font-serif text-2xl tracking-tight md:text-3xl">
              Try it gently
            </h2>
            <ol className="mt-8 flex flex-col gap-4">
              {guide.practice.map((item, i) => (
                <li key={item.title} className="flex gap-5 rounded-2xl bg-card p-6 shadow-sm">
                  <span className="font-serif text-2xl text-pink" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </SectionReveal>
        </section>

        <section aria-labelledby="phrases-heading" className="bg-brand text-primary-foreground">
          <SectionReveal
            message="Finding kind words you can use…"
            messageClassName="text-primary-foreground/80"
            className="mx-auto w-full max-w-3xl px-6 py-16"
          >
            <h2 id="phrases-heading" className="font-serif text-2xl tracking-tight md:text-3xl">
              Words you can borrow
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {guide.phrases.map((phrase) => (
                <li key={phrase} className="rounded-xl bg-primary-foreground/10 p-5 font-serif text-lg leading-snug">
                  {`“${phrase}”`}
                </li>
              ))}
            </ul>
          </SectionReveal>
        </section>

        <section aria-label="A gentle reminder">
          <SectionReveal message="A gentle reminder for you…" className="mx-auto w-full max-w-3xl px-6 py-16">
            <p className="border-l-2 border-pink pl-5 font-serif text-xl leading-relaxed md:text-2xl">
              {guide.gentleNote}
            </p>

            <nav aria-label="Other steps" className="mt-14 flex flex-col gap-3 sm:flex-row sm:justify-between">
              {previous ? (
                <Link
                  href={`/steps/${previous.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-brand"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  {previous.title}
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/steps/${next.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85"
                >
                  Next: {next.title}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              ) : (
                <Link
                  href="/#how-it-works"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85"
                >
                  Take your kind pause
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              )}
            </nav>
          </SectionReveal>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
