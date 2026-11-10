import { MotionConfig } from 'motion/react'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useTasks } from '@/features/tasks/useTasks'
import { TaskInput } from '@/features/tasks/components/TaskInput'
import { TaskList } from '@/features/tasks/components/TaskList'
import { useHotkey } from '@/lib/useHotkey'

export default function App() {
  const { tasks, addTask, toggleTask, removeTask, restoreTask } = useTasks()

  useHotkey('n', () => {
    document.querySelector<HTMLInputElement>('input[aria-label="Neue Aufgabe"]')?.focus()
  })

  return (
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-16">
          <header className="flex flex-col gap-2">
            <h1 className="text-gradient text-5xl font-bold tracking-tight sm:text-6xl">CAS-Überlebensliste</h1>
            <p className="text-muted-foreground">Lernen mit Schärfegrad 🌶️</p>
          </header>
          <TaskInput onAdd={addTask} />
          <TaskList tasks={tasks} onToggle={toggleTask} onRemove={removeTask} onRestore={restoreTask} />
        </main>
        <Toaster position="bottom-center" richColors closeButton />
      </TooltipProvider>
    </MotionConfig>
  )
}
