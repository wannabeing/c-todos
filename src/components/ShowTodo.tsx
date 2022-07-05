import { useSetRecoilState } from "recoil";
import { Categories, ITodos, todoState } from "../atoms";

function ShowTodo({ text, category, id }: ITodos) {
  const setTodos = useSetRecoilState(todoState);
  const onClick = (newCategory: ITodos["category"]) => {
    setTodos((currentTodos) => {
      const targetIndex = currentTodos.findIndex((todo) => todo.id === id);
      const newTodo = { id, text, category: newCategory };

      return [
        ...currentTodos.slice(0, targetIndex),
        newTodo,
        ...currentTodos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TODO && (
        <button onClick={() => onClick(Categories.TODO)}>ToDo</button>
      )}
      {category !== Categories.DOING && (
        <button onClick={() => onClick(Categories.DOING)}>Doing</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => onClick(Categories.DONE)}>Done</button>
      )}
    </li>
  );
}
export default ShowTodo;
