import { describe, expect, it } from 'vitest'
import type { Task } from '@/features/tasks/model'
import { CURRENT_VERSION, loadState, saveState } from './storage'

const KEY = 'hwz-todo'

function task(overrides: Partial<Task> = {}): Task {
  return {
    id: '1',
    title: 'Test',
    difficulty: 2,
    done: false,
    createdAt: 1000,
    ...overrides,
  }
}

describe('loadState', () => {
  it('returns an empty state when nothing is stored', () => {
    expect(loadState()).toEqual({ version: CURRENT_VERSION, tasks: [] })
  })

  it('returns an empty state for broken JSON', () => {
    localStorage.setItem(KEY, '{kaputt')
    expect(loadState()).toEqual({ version: CURRENT_VERSION, tasks: [] })
  })

  it('returns an empty state for an invalid shape', () => {
    localStorage.setItem(KEY, JSON.stringify({ version: 1, tasks: 'nope' }))
    expect(loadState()).toEqual({ version: CURRENT_VERSION, tasks: [] })
  })

  it('reads a stored state', () => {
    const tasks = [task()]
    localStorage.setItem(KEY, JSON.stringify({ version: CURRENT_VERSION, tasks }))
    expect(loadState()).toEqual({ version: CURRENT_VERSION, tasks })
  })
})

describe('saveState', () => {
  it('writes the whole state to localStorage', () => {
    const tasks = [task()]
    saveState({ version: CURRENT_VERSION, tasks })
    const raw = localStorage.getItem(KEY)!
    expect(JSON.parse(raw)).toEqual({ version: CURRENT_VERSION, tasks })
  })
})
