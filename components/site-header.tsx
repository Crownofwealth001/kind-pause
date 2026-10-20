export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
      <a href="#top" className="flex items-center gap-2 font-serif text-xl tracking-tight">
        <span aria-hidden="true" className="size-3 rounded-full bg-sage" />
        Kind Pause
      </a>
      <nav aria-label="Main">
        <ul className="flex items-center gap-6 text-sm text-muted-foreground">
          <li className="hidden sm:block">
            <a href="#how-it-works" className="transition-colors hover:text-foreground">
              How it works
            </a>
          </li>
          <li className="hidden sm:block">
            <a href="#why" className="transition-colors hover:text-foreground">
              Why it matters
            </a>
          </li>
          <li>
            <a
              href="https://www.kindpause.com"
              className="rounded-full bg-sage px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-85"
            >
              Visit site
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
