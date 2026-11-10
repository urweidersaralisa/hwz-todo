import { useRef } from 'react'
import { motion } from 'motion/react'
import { toast } from 'sonner'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { celebrate } from '@/lib/celebrate'
import type { Task } from '../model'

const CHILIS = { 1: '🌶️', 2: '🌶️🌶️', 3: '🌶️🌶️🌶️' } as const

type TaskCardProps = {
  task: Task
  index: number
  onToggle: (id: string) => void
  onRemove: (id: string) => void
  onRestore: (task: Task, index: number) => void
}

export function TaskCard({ task, index, onToggle, onRemove, onRestore }: TaskCardProps) {
  const checkboxRef = useRef<HTMLButtonElement>(null)

  function handleToggle(done: boolean) {
    onToggle(task.id)
    if (done && !task.done) {
      const box = checkboxRef.current?.getBoundingClientRect()
      const origin =
        box && box.width > 0
          ? { x: (box.left + box.width / 2) / window.innerWidth, y: (box.top + box.height / 2) / window.innerHeight }
          : undefined
      celebrate(origin)
    }
  }

  function handleRemove() {
    onRemove(task.id)
    toast('Aufgabe gelöscht', {
      action: {
        label: 'Rückgängig',
        onClick: () => onRestore(task, index),
      },
      duration: 5000,
    })
  }

  return (
    <motion.li
      layout
      className="group glass flex items-start gap-3 rounded-xl border p-4 shadow-card transition-look hover:-translate-y-0.5 hover:shadow-pop focus-within:glow"
    >
      <Checkbox
        ref={checkboxRef}
        checked={task.done}
        onCheckedChange={handleToggle}
        className="mt-0.5 size-6 rounded-md transition-look data-[state=checked]:animate-pop data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
        aria-label={`«${task.title}» erledigt`}
      />
      <span aria-hidden className="font-mono text-sm leading-relaxed">
        {CHILIS[task.difficulty]}
      </span>
      <span
        className={`relative min-w-0 flex-1 break-words text-base leading-relaxed [overflow-wrap:anywhere] ${
          task.done ? 'text-muted-foreground' : ''
        }`}
      >
        {task.title}
        <motion.span
          aria-hidden
          className="absolute left-0 top-1/2 h-0.5 w-full origin-left bg-current"
          initial={false}
          animate={{ scaleX: task.done ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
      <Button
        variant="ghost"
        size="icon"
        aria-label={`«${task.title}» löschen`}
        onClick={handleRemove}
        className="opacity-60 transition-look group-hover:opacity-100 focus-visible:opacity-100"
      >
        <Trash2 className="size-4" />
      </Button>
    </motion.li>
  )
}
