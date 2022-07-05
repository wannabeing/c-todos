import React from "react";
import { Helmet } from "react-helmet";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, todoSelector, todoState } from "../atoms";
import CreateTodo from "./CreateTodo";
import ShowTodo from "./ShowTodo";

function Todos() {
  const todos = useRecoilValue(todoState);
  const cateTodos = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(todos);

  return (
    <div>
      <Helmet>
        <title>C-TODOS</title>
      </Helmet>
      <div>
        <h1>C-TODOS</h1>
      </div>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TODO}>Todo</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateTodo />
      <div>
        <ul>
          {cateTodos.map((todo) => (
            <ShowTodo key={todo.id} {...todo} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todos;
