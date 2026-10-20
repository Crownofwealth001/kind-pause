'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'
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
    title: 'Name the feeling',
    prompt: 'What am I feeling right now?',
    body: 'Before you respond, pause and notice what is happening inside you. Putting a name to a feeling helps it settle, so it guides you instead of driving you.',
    tip: 'Breathe in slowly for four counts, and out for six. Notice where the feeling sits in your body.',
    loading: 'Breathe in… and out. Noticing what you feel…',
  },
  {
    number: '02',
    title: 'Name the need',
    prompt: 'What do I need here?',
    body: 'Every hard feeling points to something that matters to you. When you know what you need, you can ask for it honestly instead of guessing or holding it in.',
    tip: 'There is no wrong answer. Your needs are valid, even when the moment is messy.',
    loading: 'Listening for what matters to you…',
  },
  {
    number: '03',
    title: 'Choose a gentle next step',
    prompt: 'What is a gentle next word or action?',
    body: 'You do not have to fix everything at once. Choose one small, kind step that is honest about how you feel and caring toward the other person and yourself.',
    tip: 'Small is enough. One gentle sentence can change the direction of a hard moment.',
    loading: 'Gathering gentle words for your next step…',
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
  const [active, setActive] = useState(0)
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([])
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([])
  const [selectedStep, setSelectedStep] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (loadingTimer.current) clearTimeout(loadingTimer.current)
  }, [])

  const goTo = (index: number) => {
    setActive(index)
    setLoading(true)
    if (loadingTimer.current) clearTimeout(loadingTimer.current)
    loadingTimer.current = setTimeout(() => setLoading(false), 1100)
  }

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const reset = () => {
    setSelectedFeelings([])
    setSelectedNeeds([])
    setSelectedStep(null)
    goTo(0)
  }

  const step = steps[active]
  const hasAnything = selectedFeelings.length > 0 || selectedNeeds.length > 0 || selectedStep !== null

  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="bg-pink-soft">
      <SectionReveal message="Finding a clear path…" className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
        <h2 id="how-heading" className="font-serif text-3xl tracking-tight md:text-4xl">
          How it works
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
          Three simple steps, taken one at a time. Tap each step and choose what feels true for you right now.
        </p>

        <div role="tablist" aria-label="Kind Pause steps" className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => {
            const selected = i === active
            return (
              <button
                key={s.number}
                type="button"
                role="tab"
                id={`step-tab-${i}`}
                aria-selected={selected}
                aria-controls={`step-panel-${i}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => goTo(i)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight') goTo((active + 1) % steps.length)
                  if (e.key === 'ArrowLeft') goTo((active - 1 + steps.length) % steps.length)
                }}
                className={cn(
                  'flex flex-col rounded-2xl p-6 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2',
                  selected ? 'bg-brand text-primary-foreground shadow-md' : 'bg-card shadow-sm hover:shadow-md',
                )}
              >
                <span className={cn('font-serif text-sm', selected ? 'text-primary-foreground/80' : 'text-pink')}>
                  {s.number}
                </span>
                <span className="mt-4 font-serif text-xl tracking-tight md:text-2xl">{s.title}</span>
                <span className={cn('mt-2 text-sm leading-relaxed', selected ? 'text-primary-foreground/85' : 'text-muted-foreground')}>
                  {s.prompt}
                </span>
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`step-panel-${active}`}
          aria-labelledby={`step-tab-${active}`}
          aria-busy={loading}
          key={`${active}-${loading}`}
          className="mt-6 animate-in fade-in slide-in-from-bottom-2 rounded-2xl bg-card p-8 shadow-sm duration-500 md:p-10"
        >
          {loading ? (
            <div role="status" className="flex min-h-72 flex-col items-center justify-center gap-6 text-center">
              <span className="relative flex size-14 items-center justify-center" aria-hidden="true">
                <span className="absolute inset-0 animate-ping rounded-full bg-pink/30 [animation-duration:1.6s]" />
                <span className="size-8 animate-pulse rounded-full bg-brand" />
              </span>
              <p className="font-serif text-xl tracking-tight text-foreground md:text-2xl">{step.loading}</p>
              <p className="text-sm text-muted-foreground">
                Step {step.number} · {step.title}
              </p>
            </div>
          ) : (
          <>
          <p className="font-serif text-2xl tracking-tight md:text-3xl">{step.prompt}</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{step.body}</p>

          <div className="mt-8">
            {active === 0 && (
              <div className="flex flex-wrap gap-2" aria-label="Feelings">
                {feelings.map((f) => (
                  <Chip
                    key={f}
                    label={f}
                    pressed={selectedFeelings.includes(f)}
                    onClick={() => toggle(selectedFeelings, setSelectedFeelings, f)}
                  />
                ))}
              </div>
            )}
            {active === 1 && (
              <div className="flex flex-wrap gap-2" aria-label="Needs">
                {needs.map((n) => (
                  <Chip
                    key={n}
                    label={n}
                    pressed={selectedNeeds.includes(n)}
                    onClick={() => toggle(selectedNeeds, setSelectedNeeds, n)}
                  />
                ))}
              </div>
            )}
            {active === 2 && (
              <ul className="grid gap-3 sm:grid-cols-2">
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
            )}
          </div>

          <p className="mt-8 border-l-2 border-pink pl-4 text-sm leading-relaxed text-muted-foreground">{step.tip}</p>

          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-70 disabled:pointer-events-none disabled:opacity-0"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back
            </button>
            {active < steps.length - 1 && (
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85"
              >
                Next step
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>
          </>
          )}
        </div>

        <div aria-live="polite" className="mt-6 rounded-2xl border border-brand/20 bg-background p-8 md:p-10">
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Your kind pause</p>
            {hasAnything && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <RotateCcw className="size-3.5" aria-hidden="true" />
                Start again
              </button>
            )}
          </div>
          {hasAnything ? (
            <div className="mt-4 space-y-3 font-serif text-xl leading-snug md:text-2xl">
              {selectedFeelings.length > 0 && (
                <p>
                  I feel <span className="text-brand">{joinWords(selectedFeelings).toLowerCase()}</span>.
                </p>
              )}
              {selectedNeeds.length > 0 && (
                <p>
                  I need <span className="text-brand">{joinWords(selectedNeeds).toLowerCase()}</span>.
                </p>
              )}
              {selectedStep !== null && (
                <p>
                  My gentle next step: <span className="text-brand">{nextSteps[selectedStep].words}</span>
                </p>
              )}
              {selectedFeelings.length > 0 && selectedNeeds.length > 0 && selectedStep !== null && (
                <p className="pt-2 font-sans text-base text-muted-foreground">
                  You paused, you listened to yourself, and you chose care. That is enough for now.
                </p>
              )}
            </div>
          ) : (
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Take your time. As you choose your words above, they will gather here, so you can see your feeling, your need, and your next step together.
            </p>
          )}
        </div>
      </SectionReveal>
    </section>
  )
}
