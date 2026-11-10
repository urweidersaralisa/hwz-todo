import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TaskCard } from './TaskCard'
import { TaskList } from './TaskList'
import type { Task } from '../model'

function task(overrides: Partial<Task> = {}): Task {
  return {
    id: '1',
    title: 'Embeddings',
    difficulty: 2,
    done: false,
    createdAt: 1000,
    ...overrides,
  }
}

describe('TaskList', () => {
  it('shows the given tasks', () => {
    const tasks = [
      task({ id: '1', title: 'Embeddings', difficulty: 1 }),
      task({ id: '2', title: 'RAG', difficulty: 3 }),
    ]
    render(<TaskList tasks={tasks} onToggle={() => {}} onRemove={() => {}} />)
    expect(screen.getByText('Embeddings')).toBeInTheDocument()
    expect(screen.getByText('RAG')).toBeInTheDocument()
  })

  it('shows an empty list when there are no tasks', () => {
    render(<TaskList tasks={[]} onToggle={() => {}} onRemove={() => {}} />)
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })
})

describe('TaskCard', () => {
  it('shows the title and the matching number of chili icons', () => {
    render(<TaskCard task={task({ title: 'RAG', difficulty: 3 })} onToggle={() => {}} onRemove={() => {}} />)
    expect(screen.getByText('RAG')).toBeInTheDocument()
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('aria-label', '«RAG» erledigt')
    expect(checkbox).not.toBeChecked()
  })

  it('marks the checkbox as done for a completed task', () => {
    render(
      <TaskCard task={task({ title: 'RAG', done: true })} onToggle={() => {}} onRemove={() => {}} />,
    )
    expect(screen.getByRole('checkbox')).toBeChecked()
  })
})
