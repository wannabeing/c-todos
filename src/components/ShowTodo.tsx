import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, ITodos, todoState } from "../atoms";

const LI = styled.li`
  padding-bottom: 12px;
`;

const Text = styled.span`
  font-weight: 400;
  font-size: 16px;
  margin-right: 7px;
`;

const Btn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: none;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  font-weight: 600;
  cursor: pointer;
  margin: 3px;
  transition: all 0.1s linear;
  &:hover {
    transform: scale(1.1, 1.1);
  }
  img {
    width: 100%;
    background-color: ${(props) => props.theme.bgColor};
  }
`;

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
  const onDelete = (event: React.MouseEvent) => {
    setTodos((currentTodos) => {
      const targetIndex = currentTodos.findIndex((todo) => todo.id === id);
      return [
        ...currentTodos.slice(0, targetIndex),
        ...currentTodos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <LI>
      <Text>{text}</Text>
      {category !== Categories.TODO && (
        <Btn onClick={() => onClick(Categories.TODO)}>ToDo</Btn>
      )}
      {category !== Categories.DOING && (
        <Btn onClick={() => onClick(Categories.DOING)}>Doing</Btn>
      )}
      {category !== Categories.DONE && (
        <Btn onClick={() => onClick(Categories.DONE)}>Done</Btn>
      )}
      <Btn onClick={onDelete}>Delete</Btn>
    </LI>
  );
}
export default ShowTodo;
