const steps = [
  { number: '01', title: 'Name the feeling', prompt: 'What am I feeling right now?' },
  { number: '02', title: 'Name the need', prompt: 'What do I need here?' },
  {
    number: '03',
    title: 'Choose a gentle next step',
    prompt: 'What is a gentle next word or action?',
  },
]

export function Steps() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="bg-sage-soft">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
        <h2 id="how-heading" className="font-serif text-3xl tracking-tight md:text-4xl">
          How it works
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
          Three simple steps, taken one at a time.
        </p>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.number} className="flex flex-col rounded-2xl bg-card p-8 shadow-sm">
              <span className="font-serif text-sm text-[#6f7f68]">{step.number}</span>
              <h3 className="mt-6 font-serif text-2xl tracking-tight">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{step.prompt}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
