import { AnimatePresence } from 'motion/react'
import type { Task } from '../model'
import { TaskCard } from './TaskCard'

type TaskListProps = {
  tasks: Task[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
  onRestore: (task: Task, index: number) => void
}

export function TaskList({ tasks, onToggle, onRemove, onRestore }: TaskListProps) {
  return (
    <ul className="flex flex-col gap-3">
      <AnimatePresence initial={false} mode="popLayout">
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            index={index}
            onToggle={onToggle}
            onRemove={onRemove}
            onRestore={onRestore}
          />
        ))}
      </AnimatePresence>
    </ul>
  )
}
