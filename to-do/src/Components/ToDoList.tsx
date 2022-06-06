import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoList = () => {
  // const toDos = useRecoilValue(toDoState);
  const todoSelect = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />

      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>

      <CreateToDo />
      {todoSelect.map((todo) => (
        <ToDo key={todo.id} {...todo} />
        // <ToDo key={todo.id} text={todo.text} category={todo.category} id={todo.id} />


      ))}
    </div>
  );
};

export default ToDoList;
