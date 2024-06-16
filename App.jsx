import "./style.css"
import { useState } from "react"

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [image, setImage] = useState(null)
  const [todos, setTodos] = useState([])
  const [isPremium, setIsPremium] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    setTodos(currentTodos => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: newItem, completed: false, image: isPremium ? image : null },
    ])

    setNewItem("")
    setImage(null)
  }

  const toggleTodo = (id, completed) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id))
  }

  const handleBuyPremium = () => {
    setIsPremium(true)
    alert("You are now a premium user!")
  }

  return (
    <>
      <button className="btn premium-btn" onClick={handleBuyPremium}>
        Buy Premium
      </button>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            type="text"
            value={newItem}
            id="item"
            onChange={e => setNewItem(e.target.value)}
          />
        </div>
        {isPremium && (
          <div className="form-row">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              onChange={e => setImage(e.target.files[0])}
            />
          </div>
        )}
        <button className="btn">Add</button>
      </form>
      <h1 className="header">To Do List</h1>
      <ul className="list">
        {todos.length === 0 && "No Todos"}
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={e => toggleTodo(todo.id, e.target.checked)}
              />
              {todo.title}
            </label>
            {todo.image && <img src={URL.createObjectURL(todo.image)} alt="To-Do" className="todo-image" />}
            <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
