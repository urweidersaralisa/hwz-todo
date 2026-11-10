export type Difficulty = 1 | 2 | 3

export type Task = {
  id: string
  title: string
  difficulty: Difficulty
  done: boolean
  createdAt: number
}

export const MAX_TITLE_LENGTH = 200

export function addTask(tasks: Task[], title: string, difficulty: Difficulty = 2): Task[] {
  const trimmed = title.trim().slice(0, MAX_TITLE_LENGTH)
  if (!trimmed) return tasks
  const task: Task = {
    id: crypto.randomUUID(),
    title: trimmed,
    difficulty,
    done: false,
    createdAt: Date.now(),
  }
  return [task, ...tasks]
}

export function toggleTask(tasks: Task[], id: string): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
}

export function removeTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((t) => t.id !== id)
}

export function restoreTaskAt(tasks: Task[], task: Task, index: number): Task[] {
  const next = [...tasks]
  next.splice(Math.min(Math.max(index, 0), next.length), 0, task)
  return next
}
