import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'

export enum Categories {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

export interface IToDo {
  id: number
  text: string
  category: Categories
}

const { persistAtom: toDoPersistAtom } = recoilPersist()
const { persistAtom: categoryPersistAtom } = recoilPersist()

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
  effects_UNSTABLE: [categoryPersistAtom],
})

export const toDoState = atom<IToDo[]>({
  key: 'toDos',
  default: [],
  effects_UNSTABLE: [toDoPersistAtom],
})

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState)
    const category = get(categoryState)
    return toDos.filter((toDo) => toDo.category === category)
  },
})
