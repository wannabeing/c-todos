import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export enum Categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface ITodos {
  text: string;
  id: number;
  category: Categories;
}

// 로컬 스토리지 연결
const { persistAtom } = recoilPersist({
  key: "todoLocal",
  storage: localStorage,
});

export const todoState = atom<ITodos[]>({
  key: "todo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TODO,
});
export const themeState = atom<Boolean>({
  key: "theme",
  default: true,
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});
