import confetti from 'canvas-confetti'
import { toast } from 'sonner'
import { readConfettiColors } from './theme'

const CATCHPHRASES = [
  'Boom! Wieder ein Begriff im Kopf.',
  'Gelernt – das sitzt!',
  'Top! Schon wieder eines geschafft.',
  'Stark! Dein Gehirn macht Überstunden.',
  'Weiter so, gleich ist alles im Kopf!',
]

export function randomCatchphrase(): string {
  return CATCHPHRASES[Math.floor(Math.random() * CATCHPHRASES.length)]!
}

export function celebrate(origin?: { x: number; y: number }) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduced) {
    confetti({
      particleCount: 40,
      spread: 60,
      startVelocity: 25,
      scalar: 0.8,
      ticks: 120,
      colors: readConfettiColors(),
      origin,
    })
  }
  toast(randomCatchphrase())
}
