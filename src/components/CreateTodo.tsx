import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, todoState } from "../atoms";
import addBtn from "../images/addBtn.png";

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  input {
    width: 30%;
    height: 40px;
    font-size: 16px;
    text-align: center;
  }
  img {
    width: 20%;
  }
`;

const ErrorMsg = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 800;
  color: #e84118;
  margin-bottom: 20px;
`;
const Btn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: none;
  background-color: ${(props) => props.theme.bgColor};
  cursor: pointer;
  margin-left: 5px;
  transition: all 0.1s linear;
  &:hover {
    transform: scale(1.1, 1.1);
  }
  img {
    width: 100%;
    background-color: ${(props) => props.theme.bgColor};
  }
`;

interface IForms {
  todo: string;
  extraError?: string;
}

function CreateTodo() {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<IForms>();
  const setTodos = useSetRecoilState(todoState);
  const category = useRecoilValue(categoryState);

  const onSubmit = ({ todo }: IForms) => {
    setTodos((oldVal) => [{ id: Date.now(), text: todo, category }, ...oldVal]);
    setValue("todo", "");
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("todo", {
            required: "3자 이상을 입력해주세요.",
            minLength: {
              value: 3,
              message: "너무 짧아요!",
            },
            maxLength: {
              value: 30,
              message: "너무 길어요!",
            },
          })}
          type="text"
          placeholder="오늘의 할 일"
        />
        <Btn>
          <img src={addBtn} alt="addBtn" />
        </Btn>
      </Form>
      <ErrorMsg>{errors?.todo?.message}</ErrorMsg>
    </>
  );
}
export default CreateTodo;
