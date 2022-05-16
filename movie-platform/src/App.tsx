import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Circle from "./Circle";

function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) =>{
    const {currentTarget : {value} } = event;
    const {tagName} = event.currentTarget;
    // ES6 property와 변수명 동시에
    // const value = event.currentTagrget.value
    // const tageName = event.currentTagrget.tagName
    setValue(value);
  }

  const onSubmit = (event:React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    console.log("Hello", value);
  }



  return (
    <>
      {/* <Circle borderColor="black" bgColor="skyblue"></Circle>
      <Circle text="I'm here" bgColor="tomato"></Circle> */}


      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="username"
        />
        <button>Log in</button>
      </form>
    </>
  );
}

export default App;
