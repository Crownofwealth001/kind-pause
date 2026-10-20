import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
      <Link href="/" className="flex items-center gap-2 font-serif text-xl tracking-tight">
        <span aria-hidden="true" className="size-3 rounded-full bg-pink" />
        Kind Pause
      </Link>
      <nav aria-label="Main">
        <ul className="flex items-center gap-6 text-sm text-muted-foreground">
          <li className="hidden sm:block">
            <Link href="/#how-it-works" className="transition-colors hover:text-foreground">
              How it works
            </Link>
          </li>
          <li className="hidden sm:block">
            <Link href="/#why" className="transition-colors hover:text-foreground">
              Why it matters
            </Link>
          </li>
          <li>
            <Link
              href="/#how-it-works"
              className="rounded-full bg-brand px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-85"
            >
              Take a pause
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
