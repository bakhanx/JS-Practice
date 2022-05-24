import React, { useState } from "react";

import { useForm } from "react-hook-form";

const ToDoList = () => {
  //   const [todo, setToDo] = useState("");
  //   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
  //     const {
  //       currentTarget: { value },
  //     } = event;
  //     setToDo(value);
  //   };

  //   const onSubmit = (event:React.FormEvent<HTMLElement>) =>{
  //       event.preventDefault();
  //       console.log(todo);
  //   }

  //   const [aa, setaa] = useState("");
  //   const onChange2 = (event : React.FormEvent<HTMLInputElement>)=>{
  //     // const value = event.currentTarget.value;/
  //     const {currentTarget : {value}} = event;
  //     setaa(value);
  //   }
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors);

  return (
    <div>
      <form 
      style={{display:"flex", flexDirection:"column"}} 
      onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", { required: true, minLength: 10 })}
          placeholder="Email"
        />
        <input
          {...register("firstName", { required: "Input your first name" })}
          placeholder="First Name"
        />
        <input
          {...register("lastName", { required: true })}
          placeholder="Last Name"
        />
        <input
          {...register("password", { required: true, minLength: {
              value: 5,
              message : "Input your password at least 5 word"
          } })}
          placeholder="PassWord"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ToDoList;
