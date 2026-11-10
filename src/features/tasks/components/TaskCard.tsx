import { motion } from 'motion/react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import type { Task } from '../model'

const CHILIS = { 1: '🌶️', 2: '🌶️🌶️', 3: '🌶️🌶️🌶️' } as const

type TaskCardProps = {
  task: Task
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

export function TaskCard({ task, onToggle, onRemove }: TaskCardProps) {
  return (
    <motion.li
      layout
      className="group glass flex items-start gap-3 rounded-xl border p-4 shadow-card transition-look hover:-translate-y-0.5 hover:shadow-pop focus-within:glow"
    >
      <Checkbox
        checked={task.done}
        onCheckedChange={() => onToggle(task.id)}
        className="mt-0.5 size-6 rounded-md transition-look data-[state=checked]:animate-pop data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
        aria-label={`«${task.title}» erledigt`}
      />
      <span
        aria-hidden
        className="font-mono text-sm leading-relaxed"
      >
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
        onClick={() => onRemove(task.id)}
        className="opacity-60 transition-look group-hover:opacity-100 focus-visible:opacity-100"
      >
        <Trash2 className="size-4" />
      </Button>
    </motion.li>
  )
}
