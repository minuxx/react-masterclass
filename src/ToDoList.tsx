import { useState } from 'react'

function ToDoList() {
  const [toDo, setToDo] = useState('')

  const onChagnge = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event
    setToDo(value)
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(toDo)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChagnge} value={toDo} placeholder="Write a to do" />
        <button>Add</button>
      </form>
    </div>
  )
}

export default ToDoList
