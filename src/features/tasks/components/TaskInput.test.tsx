import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from '@/App'
import { TaskInput } from './TaskInput'

describe('TaskInput', () => {
  it('adds a trimmed title with the selected difficulty on submit', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    const input = screen.getByLabelText('Neue Aufgabe')
    await user.type(input, '  RAG  ')
    await user.click(screen.getByRole('button', { name: 'Aufgabe hinzufügen' }))
    expect(onAdd).toHaveBeenCalledWith('RAG', 2)
  })

  it('uses the chosen difficulty when adding', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    await user.type(screen.getByLabelText('Neue Aufgabe'), 'Agents')
    await user.click(screen.getByRole('button', { name: 'Schwierigkeit brennt' }))
    await user.click(screen.getByRole('button', { name: 'Aufgabe hinzufügen' }))
    expect(onAdd).toHaveBeenCalledWith('Agents', 3)
  })

  it('does not add an empty or whitespace-only title', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    await user.type(screen.getByLabelText('Neue Aufgabe'), '   ')
    await user.click(screen.getByRole('button', { name: 'Aufgabe hinzufügen' }))
    expect(onAdd).not.toHaveBeenCalled()
  })
})

describe('N-Hotkey', () => {
  it('focuses the new-task input when N is pressed', async () => {
    const user = userEvent.setup()
    render(<App />)
    const input = screen.getByLabelText('Neue Aufgabe')
    expect(input).not.toHaveFocus()
    await user.keyboard('{n}')
    expect(screen.getByLabelText('Neue Aufgabe')).toHaveFocus()
  })
})
