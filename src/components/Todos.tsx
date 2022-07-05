import React from "react";
import { Helmet } from "react-helmet";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, themeState, todoSelector } from "../atoms";
import CreateTodo from "./CreateTodo";
import ShowTodo from "./ShowTodo";
import darkMode from "../images/darkMode.png";
import lightMode from "../images/lightMode.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 50px;
  padding: 50px 0;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.0784313725);
  border-radius: 12px;
`;
const ThemeBtn = styled.button`
  width: 50px;
  height: 50px;
  margin: 20px 5px;
  border-radius: 50px;
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: white;
  cursor: pointer;
  transition: all 0.1s linear;
  &:hover {
    transform: scale(1.1, 1.1);
  }
  img {
    width: 70%;
  }
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 64px;
  font-weight: 800;
  text-transform: uppercase;
  margin: 0;
  line-height: 47px;
  letter-spacing: 2px;
  transform: skew(-10deg);
  text-shadow: #533d4a 1px 1px, #533d4a 2px 2px, #533d4a 3px 3px,
    #533d4a 4px 4px, #533d4a 5px 5px, #533d4a 6px 6px;
  min-width: 10px;
  min-height: 10px;
`;
const Select = styled.select`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  font-weight: 600;
  font-size: 18px;
  border: none;
  border-radius: 7px;
  padding: 10px 7px;
  margin: 10px 0;
  width: 40%;
  text-align: center;
  cursor: pointer;
`;

function Todos() {
  const cateTodos = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [theme, setTheme] = useRecoilState(themeState);
  const toggleTheme = () => setTheme((val) => !val);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <>
      <Helmet>
        <title>C-TODOS</title>
      </Helmet>
      <Container>
        <Title>C-TODOS</Title>
        <ThemeBtn onClick={toggleTheme}>
          <img src={theme ? lightMode : darkMode} alt="themeImg" />
        </ThemeBtn>
        <hr />
        <Select value={category} onInput={onInput}>
          <option value={Categories.TODO}>Todo</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </Select>
        <CreateTodo />
        <div>
          <ul>
            {cateTodos.map((todo) => (
              <ShowTodo key={todo.id} {...todo} />
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}

export default Todos;
