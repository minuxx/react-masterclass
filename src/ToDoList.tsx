import { useState } from 'react'
import { useForm } from 'react-hook-form'

// function ToDoList() {
//   const [toDo, setToDo] = useState('')
//   const [toDoError, setToDoError] = useState('')

//   const onChagnge = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event
//     setToDoError('')
//     setToDo(value)
//   }

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     if (toDo.length < 10) {
//       return setToDoError('To do should be longer')
//     }
//     console.log(toDo)
//   }

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChagnge} value={toDo} placeholder="Write a to do" />
//         <button>Add</button>
//         {toDoError !== '' ? toDoError : null}
//       </form>
//     </div>
//   )
// }

interface IForm {
  email: string
  firstName: string
  lastName: string
  username: string
  password: string
  checkPassword: string
}

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: '@naver.com',
    },
  })
  const onValid = (data: IForm) => {
    console.log(data)
  }

  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%-]+@naver.com$/,
              message: 'Only naver.com emails allowed',
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message as string}</span>
        <input
          {...register('firstName', { required: 'FirstName is requied' })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message as string}</span>
        <input
          {...register('lastName', { required: 'LastName is requied' })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message as string}</span>
        <input
          {...register('username', {
            required: 'Username is requied',
            minLength: 10,
          })}
          placeholder="Username"
        />
        <span>{errors?.username?.message as string}</span>
        {/* register 함수의 두 번째 인자에 validation option 객체를 전달 */}
        <input
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'Your password is too short',
            },
          })}
          placeholder="Password"
        />
        <span>{errors?.password?.message as string}</span>
        <input
          {...register('checkPassword', {
            required: 'CheckPassword is requied',
          })}
          placeholder="Check Password"
        />
        <span>{errors?.checkPassword?.message as string}</span>
        <button>Add</button>
      </form>
    </div>
  )
}

export default ToDoList
