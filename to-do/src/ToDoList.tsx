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

  interface IForm {
    email: string;
    firstName?: string; // not required
    lastName: string;
    password: string;
    password2: string;
    extraError?: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@google.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.password2) {
      setError(
        "password2",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    setError("extraError", { message: "Server offline." });
  };
  console.log("error : ", errors);

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Input your Email",
            pattern: {
              value:
                /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
              message: 'allowed form "ex)abcdef@google.com"',
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input {...register("firstName")} placeholder="First Name" />
        <input
          {...register("lastName", {
            required: "Input your last name",
            validate: {
              nobakhan: (value) =>
                value.includes("bakhan") ? "can't input it" : true,
              noManager: (value) =>
                !value.includes("manager") || "can't input it",
            },
          })}
          placeholder="Last Name"
        />{" "}
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("password", {
            required: "input your password",
            minLength: {
              value: 5,
              message: "Input your password at least 5 word",
            },
          })}
          placeholder="PassWord"
        />{" "}
        <span>{errors?.password?.message}</span>
        <input
          {...register("password2", {
            required: "input your password2",
            minLength: {
              value: 5,
              message: "Input your password at least 5 word",
            },
          })}
          placeholder="PassWord"
        />{" "}
        <span>{errors?.password2?.message}</span>
        <span>{errors?.extraError?.message}</span>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ToDoList;
