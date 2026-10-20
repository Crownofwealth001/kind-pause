'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, ChevronDown, RotateCcw } from 'lucide-react'
import { SectionReveal } from '@/components/section-reveal'
import { cn } from '@/lib/utils'

const feelings = [
  'Hurt',
  'Angry',
  'Anxious',
  'Overwhelmed',
  'Sad',
  'Disappointed',
  'Embarrassed',
  'Frustrated',
  'Unheard',
  'Tired',
]

const needs = [
  'Respect',
  'Understanding',
  'To be heard',
  'Rest',
  'Space',
  'Safety',
  'Connection',
  'Reassurance',
  'Fairness',
  'Clarity',
]

const nextSteps = [
  { label: 'Ask for a moment', words: '“I need a minute before I respond.”' },
  { label: 'Share honestly', words: '“I felt hurt when that happened.”' },
  { label: 'Ask to understand', words: '“Can you help me see what you meant?”' },
  { label: 'Make a gentle request', words: '“Could we try this differently next time?”' },
  { label: 'Step away and rest', words: 'Take a short walk or a few slow breaths first.' },
  { label: 'Write it down first', words: 'Put your thoughts on paper before you say them.' },
]

const steps = [
  {
    number: '01',
    slug: 'name-the-feeling',
    title: 'Name the feeling',
    prompt: 'What am I feeling right now?',
    body: 'Before you respond, pause and notice what is happening inside you. Putting a name to a feeling helps it settle, so it guides you instead of driving you.',
    tip: 'Breathe in slowly for four counts, and out for six. Notice where the feeling sits in your body.',
    loading: 'Breathe in… and out. Noticing what you feel…',
    choiceHint: 'Choose any that feel true. More than one is okay.',
  },
  {
    number: '02',
    slug: 'name-the-need',
    title: 'Name the need',
    prompt: 'What do I need here?',
    body: 'Every hard feeling points to something that matters to you. When you know what you need, you can ask for it honestly instead of guessing or holding it in.',
    tip: 'There is no wrong answer. Your needs are valid, even when the moment is messy.',
    loading: 'Listening for what matters to you…',
    choiceHint: 'Choose what would help most right now.',
  },
  {
    number: '03',
    slug: 'gentle-next-step',
    title: 'Choose a gentle next step',
    prompt: 'What is a gentle next word or action?',
    body: 'You do not have to fix everything at once. Choose one small, kind step that is honest about how you feel and caring toward the other person and yourself.',
    tip: 'Small is enough. One gentle sentence can change the direction of a hard moment.',
    loading: 'Gathering gentle words for your next step…',
    choiceHint: 'Pick one small step you could take.',
  },
]

function joinWords(words: string[]) {
  if (words.length <= 1) return words.join('')
  return `${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}`
}

function Chip({
  label,
  pressed,
  onClick,
}: {
  label: string
  pressed: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2',
        pressed
          ? 'border-brand bg-brand text-primary-foreground'
          : 'border-border bg-background text-foreground hover:border-brand',
      )}
    >
      {label}
    </button>
  )
}

export function Steps() {
  const [open, setOpen] = useState<number | null>(0)
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([])
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([])
  const [selectedStep, setSelectedStep] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => () => {
    if (loadingTimer.current) clearTimeout(loadingTimer.current)
  }, [])

  const openStep = (index: number, scroll = false) => {
    setOpen(index)
    setLoading(true)
    if (loadingTimer.current) clearTimeout(loadingTimer.current)
    loadingTimer.current = setTimeout(() => setLoading(false), 1100)
    if (scroll) {
      requestAnimationFrame(() =>
        itemRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      )
    }
  }

  const toggleStep = (index: number) => {
    if (open === index) {
      setOpen(null)
      setLoading(false)
      return
    }
    openStep(index)
  }

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const reset = () => {
    setSelectedFeelings([])
    setSelectedNeeds([])
    setSelectedStep(null)
    openStep(0, true)
  }

  const completed = [selectedFeelings.length > 0, selectedNeeds.length > 0, selectedStep !== null]
  const completedCount = completed.filter(Boolean).length
  const hasAnything = completedCount > 0

  const renderChoices = (index: number) => {
    if (index === 0) {
      return (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Feelings">
          {feelings.map((f) => (
            <Chip
              key={f}
              label={f}
              pressed={selectedFeelings.includes(f)}
              onClick={() => toggle(selectedFeelings, setSelectedFeelings, f)}
            />
          ))}
        </div>
      )
    }
    if (index === 1) {
      return (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Needs">
          {needs.map((n) => (
            <Chip
              key={n}
              label={n}
              pressed={selectedNeeds.includes(n)}
              onClick={() => toggle(selectedNeeds, setSelectedNeeds, n)}
            />
          ))}
        </div>
      )
    }
    return (
      <ul className="grid gap-3 sm:grid-cols-2" aria-label="Gentle next steps">
        {nextSteps.map((n, i) => {
          const pressed = selectedStep === i
          return (
            <li key={n.label}>
              <button
                type="button"
                aria-pressed={pressed}
                onClick={() => setSelectedStep(pressed ? null : i)}
                className={cn(
                  'flex h-full w-full flex-col rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2',
                  pressed ? 'border-brand bg-brand text-primary-foreground' : 'border-border hover:border-brand',
                )}
              >
                <span className="font-medium">{n.label}</span>
                <span className={cn('mt-1 text-sm leading-relaxed', pressed ? 'text-primary-foreground/85' : 'text-muted-foreground')}>
                  {n.words}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="bg-pink-soft">
      <SectionReveal message="Finding a clear path…" className="mx-auto w-full max-w-3xl px-6 py-20 md:py-28">
        <h2 id="how-heading" className="font-serif text-3xl tracking-tight md:text-4xl">
          How it works
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
          Three simple steps, taken one at a time. Open each step and choose what feels true for you right now.
        </p>

        <div className="mt-12 flex flex-col gap-4">
          {steps.map((s, i) => {
            const isOpen = open === i
            const isDone = completed[i]
            return (
              <div
                key={s.number}
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                className={cn(
                  'scroll-mt-24 overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow',
                  isOpen && 'shadow-md ring-1 ring-brand/20',
                )}
              >
                <h3>
                  <button
                    type="button"
                    id={`step-trigger-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`step-panel-${i}`}
                    onClick={() => toggleStep(i)}
                    className={cn(
                      'flex w-full items-center gap-4 p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pink md:gap-6 md:p-6',
                      isOpen ? 'bg-brand text-primary-foreground' : 'hover:bg-muted/60',
                    )}
                  >
                    <span
                      className={cn(
                        'flex size-10 shrink-0 items-center justify-center rounded-full font-serif text-sm',
                        isOpen
                          ? 'bg-primary-foreground/15 text-primary-foreground'
                          : isDone
                            ? 'bg-brand text-primary-foreground'
                            : 'bg-pink-soft text-pink',
                      )}
                    >
                      {isDone && !isOpen ? <Check className="size-4" aria-hidden="true" /> : s.number}
                      {isDone && <span className="sr-only">, chosen</span>}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="font-serif text-xl tracking-tight md:text-2xl">{s.title}</span>
                      <span className={cn('mt-1 text-sm leading-relaxed', isOpen ? 'text-primary-foreground/85' : 'text-muted-foreground')}>
                        {s.prompt}
                      </span>
                    </span>
                    <ChevronDown
                      className={cn('size-5 shrink-0 transition-transform duration-300', isOpen && 'rotate-180')}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                {isOpen && (
                  <div
                    role="region"
                    id={`step-panel-${i}`}
                    aria-labelledby={`step-trigger-${i}`}
                    aria-busy={loading}
                    key={`${i}-${loading}`}
                    className="animate-in fade-in slide-in-from-top-1 p-6 duration-500 md:p-8"
                  >
                    {loading ? (
                      <div role="status" className="flex min-h-56 flex-col items-center justify-center gap-5 text-center">
                        <span className="relative flex size-12 items-center justify-center" aria-hidden="true">
                          <span className="absolute inset-0 animate-ping rounded-full bg-pink/30 [animation-duration:1.6s]" />
                          <span className="size-7 animate-pulse rounded-full bg-brand" />
                        </span>
                        <p className="font-serif text-lg tracking-tight text-foreground md:text-xl">{s.loading}</p>
                      </div>
                    ) : (
                      <>
                        <p className="max-w-2xl leading-relaxed text-muted-foreground">{s.body}</p>
                        <p className="mt-6 text-sm font-medium text-foreground">{s.choiceHint}</p>
                        <div className="mt-3">{renderChoices(i)}</div>

                        <p className="mt-6 border-l-2 border-pink pl-4 text-sm leading-relaxed text-muted-foreground">{s.tip}</p>

                        <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <Link
                            href={`/steps/${s.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-medium text-brand underline underline-offset-4 hover:no-underline"
                          >
                            Read the full guide
                            <ArrowRight className="size-4" aria-hidden="true" />
                          </Link>
                          {i < steps.length - 1 ? (
                            <button
                              type="button"
                              onClick={() => openStep(i + 1, true)}
                              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85"
                            >
                              Next: {steps[i + 1].title}
                              <ArrowRight className="size-4" aria-hidden="true" />
                            </button>
                          ) : (
                            <a
                              href="#your-kind-pause"
                              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85"
                            >
                              See your kind pause
                              <ArrowRight className="size-4" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div id="your-kind-pause" aria-live="polite" className="scroll-mt-24">
          {hasAnything && (
            <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 rounded-2xl border border-brand/20 bg-background p-6 duration-500 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Your kind pause</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {completedCount} of 3 steps chosen
                  </p>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <RotateCcw className="size-3.5" aria-hidden="true" />
                  Start again
                </button>
              </div>
              <div className="mt-5 space-y-3 font-serif text-xl leading-snug md:text-2xl">
                {selectedFeelings.length > 0 && (
                  <p className="animate-in fade-in slide-in-from-left-2 duration-500">
                    I feel <span className="text-brand">{joinWords(selectedFeelings).toLowerCase()}</span>.
                  </p>
                )}
                {selectedNeeds.length > 0 && (
                  <p className="animate-in fade-in slide-in-from-left-2 duration-500">
                    I need <span className="text-brand">{joinWords(selectedNeeds).toLowerCase()}</span>.
                  </p>
                )}
                {selectedStep !== null && (
                  <p className="animate-in fade-in slide-in-from-left-2 duration-500">
                    My gentle next step: <span className="text-brand">{nextSteps[selectedStep].words}</span>
                  </p>
                )}
                {completedCount === 3 && (
                  <p className="animate-in fade-in pt-2 font-sans text-base text-muted-foreground duration-700">
                    You paused, you listened to yourself, and you chose care. That is enough for now.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </SectionReveal>
    </section>
  )
}
