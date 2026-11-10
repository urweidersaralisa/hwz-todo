import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'sonner'
import { describe, expect, it, vi } from 'vitest'
import { TaskCard } from './TaskCard'
import { TaskList } from './TaskList'
import type { Task } from '../model'

vi.mock('@/lib/celebrate', () => ({ celebrate: vi.fn() }))
vi.mock('sonner', () => ({ toast: vi.fn() }))

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
    render(<TaskList tasks={tasks} onToggle={() => {}} onRemove={() => {}} onRestore={() => {}} />)
    expect(screen.getByText('Embeddings')).toBeInTheDocument()
    expect(screen.getByText('RAG')).toBeInTheDocument()
  })

  it('shows an empty list when there are no tasks', () => {
    render(<TaskList tasks={[]} onToggle={() => {}} onRemove={() => {}} onRestore={() => {}} />)
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })
})

describe('TaskCard', () => {
  it('shows the title and the matching number of chili icons', () => {
    render(
      <TaskCard
        task={task({ title: 'RAG', difficulty: 3 })}
        index={0}
        onToggle={() => {}}
        onRemove={() => {}}
        onRestore={() => {}}
      />,
    )
    expect(screen.getByText('RAG')).toBeInTheDocument()
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('aria-label', '«RAG» erledigt')
    expect(checkbox).not.toBeChecked()
  })

  it('marks the checkbox as done for a completed task', () => {
    render(
      <TaskCard
        task={task({ title: 'RAG', done: true })}
        index={0}
        onToggle={() => {}}
        onRemove={() => {}}
        onRestore={() => {}}
      />,
    )
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls onToggle and celebrates when an open task is checked', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    const { celebrate } = await import('@/lib/celebrate')
    render(
      <TaskCard
        task={task()}
        index={0}
        onToggle={onToggle}
        onRemove={() => {}}
        onRestore={() => {}}
      />,
    )
    await user.click(screen.getByRole('checkbox'))
    expect(onToggle).toHaveBeenCalledWith('1')
    expect(celebrate).toHaveBeenCalled()
  })

  it('does not celebrate when unchecking a done task', async () => {
    const user = userEvent.setup()
    const { celebrate: celebrateMock } = await import('@/lib/celebrate')
    vi.mocked(celebrateMock).mockClear()
    render(
      <TaskCard
        task={task({ done: true })}
        index={0}
        onToggle={() => {}}
        onRemove={() => {}}
        onRestore={() => {}}
      />,
    )
    await user.click(screen.getByRole('checkbox'))
    expect(celebrateMock).not.toHaveBeenCalled()
  })
})

describe('TaskCard Löschen', () => {
  it('shows a toast with Rückgängig and restores the task', async () => {
    const user = userEvent.setup()
    const toastMock = vi.mocked(toast)
    const onRestore = vi.fn()
    const item = task({ id: '7', title: 'RAG' })
    render(
      <TaskCard task={item} index={2} onToggle={() => {}} onRemove={() => {}} onRestore={onRestore} />,
    )
    await user.click(screen.getByRole('button', { name: '«RAG» löschen' }))
    expect(toastMock).toHaveBeenCalled()
    const call = toastMock.mock.calls[0] as unknown as [string, { action: { onClick: () => void } }]
    expect(call[0]).toBe('Aufgabe gelöscht')
    call[1].action.onClick()
    expect(onRestore).toHaveBeenCalledWith(item, 2)
  })
})
