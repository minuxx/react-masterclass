import { useForm } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { categoriesState } from '../atoms'

interface ICategory {
  category: string
}

function CreateToCategory() {
  const { register, handleSubmit, setValue } = useForm()
  const setCategories = useSetRecoilState(categoriesState)

  const handleValid = ({ category }: ICategory) => {
    setCategories((oldCategories) => [...oldCategories, category])
    setValue('category', '')
  }

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('category', {
          required: true,
        })}
        placeholder="Add Category"
      />
      <button>+</button>
    </form>
  )
}

export default CreateToCategory
