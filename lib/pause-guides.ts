export type PauseGuide = {
  slug: string
  number: string
  title: string
  prompt: string
  loading: string
  intro: string
  why: string[]
  practice: { title: string; body: string }[]
  phrases: string[]
  gentleNote: string
}

export const pauseGuides: PauseGuide[] = [
  {
    slug: 'name-the-feeling',
    number: '01',
    title: 'Name the feeling',
    prompt: 'What am I feeling right now?',
    loading: 'Breathe in… and out. Opening a quiet space for your feelings…',
    intro:
      'Hard moments often arrive as one big wave. Naming the feeling turns that wave into something you can see, hold, and understand, so it can guide you instead of driving you.',
    why: [
      'A named feeling usually feels a little smaller and calmer.',
      'It gives you a moment between what happened and how you respond.',
      'It helps you speak about yourself honestly, without blaming anyone.',
    ],
    practice: [
      {
        title: 'Slow your breath',
        body: 'Breathe in for four counts and out for six. Do this three times before anything else.',
      },
      {
        title: 'Notice your body',
        body: 'Is there tightness in your chest, heat in your face, or heaviness in your shoulders? Your body often knows first.',
      },
      {
        title: 'Find the word',
        body: 'Try finishing the sentence “Right now I feel…”. More than one word is okay. Feelings can be mixed.',
      },
    ],
    phrases: [
      'Right now I feel hurt.',
      'I notice I am getting overwhelmed.',
      'Part of me is angry, and part of me is sad.',
      'I feel unheard, and that is hard for me.',
    ],
    gentleNote:
      'There are no bad feelings here. Every feeling is information, and you are allowed to have all of them.',
  },
  {
    slug: 'name-the-need',
    number: '02',
    title: 'Name the need',
    prompt: 'What do I need here?',
    loading: 'Listening gently for what matters to you…',
    intro:
      'Underneath every hard feeling is something that matters to you. When you can name that need, you can ask for it clearly instead of guessing, hinting, or holding it all in.',
    why: [
      'Needs explain feelings: hurt often points to a need for respect or care.',
      'Knowing your need makes it easier to ask for something specific.',
      'It moves the moment from “what went wrong” to “what would help”.',
    ],
    practice: [
      {
        title: 'Follow the feeling',
        body: 'Look at the feeling you named and ask, “What is this feeling trying to protect or ask for?”',
      },
      {
        title: 'Keep it about you',
        body: 'A need is something you long for, like rest or understanding, not something the other person must do.',
      },
      {
        title: 'Say it to yourself first',
        body: 'Try “What I really need right now is…”. Let it be simple and true.',
      },
    ],
    phrases: [
      'What I really need right now is to be heard.',
      'I need a little space to think clearly.',
      'I need to feel respected in this conversation.',
      'I need some reassurance that we are okay.',
    ],
    gentleNote:
      'Your needs are valid, even when the moment is messy. Needing something does not make you too much.',
  },
  {
    slug: 'gentle-next-step',
    number: '03',
    title: 'Choose a gentle next step',
    prompt: 'What is a gentle next word or action?',
    loading: 'Gathering gentle words for your next step…',
    intro:
      'You do not have to fix everything at once. A gentle next step is one small word or action that is honest about how you feel and caring toward the other person and yourself.',
    why: [
      'Small steps are easier to take when emotions are high.',
      'A kind, honest sentence can change the direction of a hard moment.',
      'It helps you avoid both freezing and over-reacting.',
    ],
    practice: [
      {
        title: 'Choose one thing',
        body: 'Pick a single next step: pause, share, ask, or rest. One is enough.',
      },
      {
        title: 'Join honesty and care',
        body: 'Combine what you feel and what you need: “I feel… and I need…”. Say it softly and simply.',
      },
      {
        title: 'Let it be enough',
        body: 'After your step, notice how you feel. You can always take another pause later.',
      },
    ],
    phrases: [
      'I need a minute before I respond.',
      'I felt hurt when that happened, and I would like us to talk about it.',
      'Can you help me understand what you meant?',
      'Could we try this differently next time?',
    ],
    gentleNote:
      'Choosing care, even in a small way, is a brave thing to do. You can come back to this pause any time.',
  },
]

export function getPauseGuide(slug: string) {
  return pauseGuides.find((guide) => guide.slug === slug)
}
