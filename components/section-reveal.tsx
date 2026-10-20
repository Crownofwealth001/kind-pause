'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionRevealProps = {
  message: string
  children: ReactNode
  className?: string
  messageClassName?: string
  delay?: number
}

export function SectionReveal({
  message,
  children,
  className,
  messageClassName,
  delay = 900,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready'>('idle')

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStatus('ready')
      return
    }

    let timer: ReturnType<typeof setTimeout> | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        setStatus('loading')
        timer = setTimeout(() => setStatus('ready'), delay)
      },
      { threshold: 0.2 },
    )
    observer.observe(node)

    return () => {
      observer.disconnect()
      if (timer) clearTimeout(timer)
    }
  }, [delay])

  const isReady = status === 'ready'

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-500',
          isReady ? 'opacity-0' : 'opacity-100',
        )}
      >
        {!isReady && (
          <p className={cn('flex items-center gap-3 font-serif text-lg italic text-muted-foreground', messageClassName)}>
            <span className="flex gap-1" aria-hidden="true">
              <span className="size-1.5 animate-pulse rounded-full bg-pink" />
              <span className="size-1.5 animate-pulse rounded-full bg-pink [animation-delay:150ms]" />
              <span className="size-1.5 animate-pulse rounded-full bg-pink [animation-delay:300ms]" />
            </span>
            {message}
          </p>
        )}
      </div>
      <div
        aria-busy={!isReady}
        className={cn(
          'transition-all duration-700 ease-out',
          isReady ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
        )}
      >
        {children}
      </div>
    </div>
  )
}
