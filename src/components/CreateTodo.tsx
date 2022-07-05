import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, todoState } from "../atoms";

const ErrorMsg = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #e84118;
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
    console.log("add", todo);
    setTodos((oldVal) => [{ id: Date.now(), text: todo, category }, ...oldVal]);
    setValue("todo", "");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          placeholder="to-do of the day"
        />
        <button>추가</button>
      </form>
      <ErrorMsg>{errors?.todo?.message}</ErrorMsg>
    </>
  );
}
export default CreateTodo;
