import type { Task } from '@/features/tasks/model'

export const STORAGE_KEY = 'hwz-todo'
export const CURRENT_VERSION = 1

export type State = {
  version: number
  tasks: Task[]
}

const initialState: State = { version: CURRENT_VERSION, tasks: [] }

function isValidState(value: unknown): value is State {
  if (typeof value !== 'object' || value === null) return false
  const s = value as Record<string, unknown>
  return s.version === CURRENT_VERSION && Array.isArray(s.tasks)
}

export function loadState(): State {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return initialState
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!isValidState(parsed)) return initialState
    return { version: parsed.version, tasks: parsed.tasks }
  } catch {
    return initialState
  }
}

export function saveState(state: State): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
