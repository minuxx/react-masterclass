import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { categoriesState, categoryState, toDoSelector } from '../atoms'
import CreateToCategory from './CreateCategory'
import CreateToDo from './CreateToDo'
import ToDo from './ToDo'

const InputFormWrapper = styled.div`
  display: flex;

  form + form {
    margin-left: 10px;

    input {
      width: 100px;
    }
  }
`

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector) // 반환된 세 개의 배열을 각각 받는다.
  const [category, setCategory] = useRecoilState(categoryState)
  const categories = useRecoilValue(categoriesState)

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
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </form>

      <InputFormWrapper>
        <CreateToDo />
        <CreateToCategory />
      </InputFormWrapper>

      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  )
}

export default ToDoList
