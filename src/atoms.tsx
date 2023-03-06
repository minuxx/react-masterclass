import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'

export enum DefaultCategories {
  'TO_DO' = 'ToDo',
  'DOING' = 'Doing',
  'DONE' = 'Done',
}

export type Categories = DefaultCategories | string

export interface IToDo {
  id: number
  text: string
  category: DefaultCategories | string
}

const { persistAtom: toDoPersistAtom } = recoilPersist()
const { persistAtom: categoryPersistAtom } = recoilPersist()
const { persistAtom: categoriesPersistAtom } = recoilPersist()

export const categoryState = atom<Categories>({
  key: 'category',
  default: DefaultCategories.TO_DO,
  effects_UNSTABLE: [categoryPersistAtom],
})

export const categoriesState = atom<Categories[]>({
  key: 'categories',
  default: [
    DefaultCategories.TO_DO,
    DefaultCategories.DOING,
    DefaultCategories.DONE,
  ],
  effects_UNSTABLE: [categoriesPersistAtom],
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
