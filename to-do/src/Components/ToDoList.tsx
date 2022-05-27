import React from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

const ToDoList = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();

  // ================== to-do ===============
  interface IForm {
    toDo: string;
  }
  const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
  });

  interface IToDo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
  }
  const [toDos, setToDos] = useRecoilState(toDoState);
  const handleValid = ({ toDo }: IForm) => {
    setToDos((curVal) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...curVal,
    ]);
    setValue("toDo", "");
  };
  console.log(toDos);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", { required: "please write to do" })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>

      <ul>
        {toDos.map(toDo=> <li key={toDo.id}>{toDo.text}</li>)}
      </ul>
    </div>
  );
};

export default ToDoList;
