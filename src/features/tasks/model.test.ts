import { describe, expect, it } from 'vitest'
import type { Task } from './model'
import { addTask, removeTask, toggleTask } from './model'

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

describe('addTask', () => {
  it('adds a task at the top with trim, difficulty and done false', () => {
    const tasks = [task()]
    const result = addTask(tasks, '  Embeddings  ', 3)
    expect(result).toHaveLength(2)
    expect(result[0]).toMatchObject({ title: 'Embeddings', difficulty: 3, done: false })
  })

  it('ignores an empty or whitespace-only title', () => {
    expect(addTask([], '   ')).toHaveLength(0)
    expect(addTask([task()], '')).toHaveLength(1)
  })

  it('truncates the title to 200 characters', () => {
    const long = 'x'.repeat(250)
    const result = addTask([], long, 1)
    expect(result[0].title).toHaveLength(200)
  })
})

describe('toggleTask', () => {
  it('toggles done and returns a new array', () => {
    const tasks = [task({ done: false })]
    const result = toggleTask(tasks, '1')
    expect(result[0].done).toBe(true)
    expect(tasks[0].done).toBe(false)
    expect(result).not.toBe(tasks)
  })

  it('does not change anything for an unknown id', () => {
    const tasks = [task()]
    const result = toggleTask(tasks, 'nope')
    expect(result).toEqual(tasks)
  })
})

describe('removeTask', () => {
  it('removes the task with the given id', () => {
    const tasks = [task({ id: '1' }), task({ id: '2' })]
    const result = removeTask(tasks, '1')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('2')
  })

  it('returns the same array for an unknown id', () => {
    const tasks = [task({ id: '1' })]
    const result = removeTask(tasks, 'x')
    expect(result).toEqual(tasks)
  })
})
