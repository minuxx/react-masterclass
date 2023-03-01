import { useForm } from 'react-hook-form'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { categoryState, toDoState } from '../atoms'

interface IForm {
  toDo: string
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm()
  const setToDos = useSetRecoilState(toDoState)
  const category = useRecoilValue(categoryState)

  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { id: Date.now(), text: toDo, category },
      ...oldToDos,
    ])
    setValue('toDo', '')
  }

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('toDo', {
          required: 'Please write a To Do',
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  )
}

export default CreateToDo
