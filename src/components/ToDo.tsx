import { IToDo, toDoState } from '../atoms'
import { useSetRecoilState } from 'recoil'

function ToDo({ text, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState)
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event
    console.log(name)
  }

  return (
    <li>
      <span>{text}</span>
      {category !== 'DOING' && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== 'TO_DO' && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== 'DONE' && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  )
}

export default ToDo
