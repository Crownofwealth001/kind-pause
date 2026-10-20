import { SectionReveal } from '@/components/section-reveal'

export function SiteFooter() {
  return (
    <footer className="bg-brand text-primary-foreground">
      <SectionReveal
        message="One gentle next step…"
        messageClassName="text-primary-foreground/80"
        className="mx-auto w-full max-w-5xl px-6 py-16"
      >
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif text-3xl tracking-tight md:text-4xl">See it or read more</p>
            <a
              href="https://www.kindpause.com"
              className="mt-4 inline-block text-lg font-medium underline underline-offset-4 hover:no-underline"
            >
              www.kindpause.com
            </a>
          </div>
          <p className="text-sm">
            Made by <span className="font-medium">Khadijat Sanni</span>
          </p>
        </div>
      </SectionReveal>
    </footer>
  )
}
