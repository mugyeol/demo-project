import { useEffect, useMemo, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'trustmee.todo.items.v1'

function readTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item) => item && typeof item.id === 'string' && typeof item.text === 'string')
  } catch {
    return []
  }
}

function createTodo(text) {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    done: false,
    createdAt: Date.now(),
  }
}

function App() {
  const [todos, setTodos] = useState(() => readTodos())
  const [draft, setDraft] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const stats = useMemo(() => {
    const total = todos.length
    const done = todos.filter((item) => item.done).length
    return { total, done, left: total - done }
  }, [todos])

  const visibleTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((item) => !item.done)
    if (filter === 'done') return todos.filter((item) => item.done)
    return todos
  }, [todos, filter])

  function addTodo(event) {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    setTodos((prev) => [createTodo(text), ...prev])
    setDraft('')
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)),
    )
  }

  function removeTodo(id) {
    setTodos((prev) => prev.filter((item) => item.id !== id))
  }

  function clearDone() {
    setTodos((prev) => prev.filter((item) => !item.done))
  }

  return (
    <main className="todo-page">
      <section className="todo-shell">
        <header className="todo-header">
          <p className="eyebrow">Trustmee Test Project</p>
          <h1>Todo List</h1>
          <p className="subtitle">[LOCAL NODE // STORAGE ACTIVE]</p>
        </header>

        <form className="todo-form" onSubmit={addTodo}>
          <input
            aria-label="Add todo"
            className="todo-input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Add a task..."
          />
          <button className="add-btn" type="submit">
            Add
          </button>
        </form>

        <section className="toolbar" aria-label="Filters">
          <div className="filters">
            <button
              type="button"
              className={filter === 'all' ? 'filter-btn is-active' : 'filter-btn'}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={filter === 'active' ? 'filter-btn is-active' : 'filter-btn'}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              type="button"
              className={filter === 'done' ? 'filter-btn is-active' : 'filter-btn'}
              onClick={() => setFilter('done')}
            >
              Done
            </button>
          </div>
          <button type="button" className="ghost-btn" onClick={clearDone} disabled={stats.done === 0}>
            Clear done
          </button>
        </section>

        <ul className="todo-list" aria-live="polite">
          {visibleTodos.length === 0 ? (
            <li className="empty">No tasks in this filter.</li>
          ) : (
            visibleTodos.map((item) => (
              <li key={item.id} className={item.done ? 'todo-item is-done' : 'todo-item'}>
                <label className="todo-main">
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleTodo(item.id)}
                  />
                  <span>{item.text}</span>
                </label>
                <button type="button" className="delete-btn" onClick={() => removeTodo(item.id)}>
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>

        <footer className="todo-footer">
          <span>{stats.left} left</span>
          <span>{stats.done} done</span>
          <span>{stats.total} total</span>
        </footer>
      </section>
    </main>
  )
}

export default App
