import { useRecoilState, useRecoilValue } from 'recoil'
import { Categories, categoryState, toDoSelector } from '../atoms'
import CreateToDo from './CreateToDo'
import ToDo from './ToDo'

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector) // 반환된 세 개의 배열을 각각 받는다.
  const [category, setCategory] = useRecoilState(categoryState)

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event
    setCategory(value as any)
  }

  return (
    <div>
      <h1>To Dos</h1>
      <hr />

      <form>
        <select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.TO_DO}>Done</option>
        </select>
      </form>

      <CreateToDo />

      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  )
}

export default ToDoList
