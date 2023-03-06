import { Categories, categoriesState, IToDo, toDoState } from '../atoms'
import { useSetRecoilState, useRecoilValue } from 'recoil'

function ToDo({ id, text, category: nowCategory }: IToDo) {
  const setToDos = useSetRecoilState(toDoState)
  const categories = useRecoilValue(categoriesState)
  const onClick = (newCategory: Categories) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id)
      const newToDo = { text, id, category: newCategory }

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ]
    })
  }

  return (
    <li>
      <span>{text}</span>
      {categories
        .filter((category) => category !== nowCategory)
        .map((category) => (
          <button onClick={() => onClick(category)}>{category}</button>
        ))}
    </li>
  )
}

export default ToDo
