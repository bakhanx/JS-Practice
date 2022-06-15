import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryState, customCategoryState, toDoSelector, toDoState } from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoList = () => {
  // const toDos = useRecoilValue(toDoState);
  const todoSelect = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const setCustomCategory = useSetRecoilState(customCategoryState);

  const AddCategory = () => {
    const inputVal = document.querySelector("input")?.value;
    setCustomCategory(inputVal as any);
    let option: any = document.createElement("option");
    option.text = inputVal;
    option.value = inputVal;
    const select = document.querySelector('select');
    select?.appendChild(option);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />

      <div>
        <input id="input-add-categroy" type="text" />
        <button onClick={AddCategory} id="btn-add-category">
          Add Category
        </button>
      </div>

      <div style={{ padding: "10px" }}></div>
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
