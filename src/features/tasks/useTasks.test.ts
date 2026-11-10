import { renderHook, act } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useTasks } from './useTasks'
import { CURRENT_VERSION, STORAGE_KEY } from '@/lib/storage'

describe('useTasks', () => {
  it('loads tasks from localStorage', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: CURRENT_VERSION, tasks: [{ id: '1', title: 'A', difficulty: 1, done: false, createdAt: 1 }] }),
    )
    const { result } = renderHook(() => useTasks())
    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].title).toBe('A')
  })

  it('adds a task and persists it', () => {
    const { result } = renderHook(() => useTasks())
    act(() => result.current.addTask('LangChain', 3))
    expect(result.current.tasks[0].title).toBe('LangChain')
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored.tasks[0].title).toBe('LangChain')
  })

  it('toggles and removes tasks', () => {
    const { result } = renderHook(() => useTasks())
    act(() => result.current.addTask('RAG'))
    const id = result.current.tasks[0].id
    act(() => result.current.toggleTask(id))
    expect(result.current.tasks[0].done).toBe(true)
    act(() => result.current.removeTask(id))
    expect(result.current.tasks).toHaveLength(0)
  })
})
