import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section id="top" className="mx-auto w-full max-w-5xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
      <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        A one-page space
      </p>
      <h1 className="max-w-3xl text-balance font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
        Respond to hard situations with honesty <em className="text-[#6f7f68]">and</em> care.
      </h1>
      <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
        Kind Pause walks you through naming the feeling, the need, and a gentle next word or action.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href="https://www.kindpause.com"
          className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-85"
        >
          Visit kindpause.com
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
        <a
          href="#how-it-works"
          className="rounded-full px-6 py-3 font-medium text-foreground underline-offset-4 hover:underline"
        >
          See how it works
        </a>
      </div>
    </section>
  )
}
