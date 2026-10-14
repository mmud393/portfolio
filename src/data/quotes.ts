export interface Quote {
  text: string;
  tag: string;
}

/** Practical reminders for myself — habits that make me a better developer. */
export const quotes: Quote[] = [
  { text: 'Ship small, ship often. A working feature today beats a perfect one next month.', tag: 'shipping' },
  { text: 'Read the error message fully before changing anything. The answer is usually in it.', tag: 'debugging' },
  { text: 'Make it work, make it right, then make it fast, in that order.', tag: 'workflow' },
  { text: 'Name things clearly. Future me is the person reading this code.', tag: 'clean-code' },
  { text: 'Commit early and often. Small commits make bugs easy to find and undo.', tag: 'git' },
  { text: 'Take a 5 minute break when stuck. Fresh eyes find bugs faster.', tag: 'focus' },
  { text: 'Build one real project instead of watching ten tutorials.', tag: 'learning' },
  { text: 'Write the simplest thing that works. Add complexity only when it is needed.', tag: 'simplicity' },
  { text: 'Test the edge cases: empty, null, and huge inputs break things first.', tag: 'testing' },
  { text: 'Ask for code review. Every review is a free lesson.', tag: 'growth' },
  { text: 'Document the why, not the what. The code already shows what it does.', tag: 'docs' },
  { text: 'Fix the root cause, not the symptom.', tag: 'debugging' },
  { text: 'Consistency beats intensity. One hour of coding every day adds up fast.', tag: 'habits' },
  { text: 'Keep functions small and focused. One function, one job.', tag: 'clean-code' },
  { text: 'Measure before optimizing. Guessing where it is slow wastes time.', tag: 'performance' },
  { text: 'Share what you learn. Teaching is the fastest way to understand.', tag: 'growth' },
];
