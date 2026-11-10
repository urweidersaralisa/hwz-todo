import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Difficulty } from '../model'

const OPTIONS: { value: Difficulty; label: string; chilis: string }[] = [
  { value: 1, label: 'Schwierigkeit easy', chilis: '🌶️' },
  { value: 2, label: 'Schwierigkeit knifflig', chilis: '🌶️🌶️' },
  { value: 3, label: 'Schwierigkeit brennt', chilis: '🌶️🌶️🌶️' },
]

type TaskInputProps = {
  onAdd: (title: string, difficulty: Difficulty) => void
}

export function TaskInput({ onAdd }: TaskInputProps) {
  const [title, setTitle] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty>(2)
  const [shaking, setShaking] = useState(false)

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) {
      setShaking(true)
      return
    }
    onAdd(trimmed, difficulty)
    setTitle('')
  }

  return (
    <form
      onSubmit={submit}
      className={`glass flex items-center gap-2 rounded-2xl border p-2 shadow-card ${shaking ? 'animate-shake' : ''}`}
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onAnimationEnd={() => setShaking(false)}
        className="h-14 flex-1 border-0 bg-transparent px-4 text-lg shadow-none focus-visible:ring-0"
        placeholder="Was steht an?"
        aria-label="Neue Aufgabe"
        maxLength={200}
      />
      <div className="flex items-center gap-1 rounded-xl bg-muted p-1" role="group" aria-label="Schwierigkeit">
        {OPTIONS.map((o) => (
          <Button
            key={o.value}
            type="button"
            variant={difficulty === o.value ? 'secondary' : 'ghost'}
            size="sm"
            aria-label={o.label}
            aria-pressed={difficulty === o.value}
            onClick={() => setDifficulty(o.value)}
          >
            {o.chilis}
          </Button>
        ))}
      </div>
      <Button
        type="submit"
        size="icon"
        className="size-12 rounded-xl bg-primary text-primary-foreground transition-look hover:scale-105 active:scale-95"
        aria-label="Aufgabe hinzufügen"
      >
        <Plus className="size-6" />
      </Button>
    </form>
  )
}
