import { useCallback, useState } from 'react'
import type { Difficulty, Task } from './model'
import { addTask, removeTask, toggleTask } from './model'
import { loadState, saveState } from '@/lib/storage'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadState().tasks)

  const persist = useCallback((next: Task[]) => {
    setTasks(next)
    saveState({ version: 1, tasks: next })
  }, [])

  const add = useCallback(
    (title: string, difficulty: Difficulty = 2) => {
      persist(addTask(tasks, title, difficulty))
    },
    [persist, tasks],
  )

  const toggle = useCallback(
    (id: string) => {
      persist(toggleTask(tasks, id))
    },
    [persist, tasks],
  )

  const remove = useCallback(
    (id: string) => {
      persist(removeTask(tasks, id))
    },
    [persist, tasks],
  )

  return { tasks, addTask: add, toggleTask: toggle, removeTask: remove }
}
