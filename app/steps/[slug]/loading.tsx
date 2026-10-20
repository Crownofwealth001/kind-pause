export default function Loading() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
      <div role="status" className="flex flex-col items-center gap-6">
        <span className="relative flex size-14 items-center justify-center" aria-hidden="true">
          <span className="absolute inset-0 animate-ping rounded-full bg-pink/30 [animation-duration:1.6s]" />
          <span className="size-8 animate-pulse rounded-full bg-brand" />
        </span>
        <p className="font-serif text-2xl tracking-tight">Take a slow breath. Your guide is on its way…</p>
        <p className="text-sm text-muted-foreground">There is no rush here.</p>
      </div>
    </main>
  )
}
