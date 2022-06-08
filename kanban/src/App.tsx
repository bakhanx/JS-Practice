import React from "react";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getModeForUsageLocation } from "typescript";
import { hoursSelector, minutesState, toDoState } from "./atom";
import DragabbleCard  from "./Components/DragabbleCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  width: 100vw;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 5px 10px;
  padding-top: 30px;
  border-radius: 5px;
  min-height: 300px;
`;

function App() {
  const [minutes, setMinutes] = useRecoilState(minutesState);
  const [hours, setHours] = useRecoilState(hoursSelector);
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) return;
    setToDos((oldToDos) => {
      const copyToDos = [...oldToDos];
      copyToDos.splice(source.index, 1);
      copyToDos.splice(destination?.index, 0, draggableId);
      return copyToDos;
    });
  };

  const onChangeMinutes = (event: React.FormEvent<HTMLInputElement>) =>
    setMinutes(+event.currentTarget.value);

  const onChangeHours = (event: React.FormEvent<HTMLInputElement>) =>
    setHours(+event.currentTarget.value);

  return (
    <>
      {/* DragDropContext -> Droppable -> Draggable */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {(magic) => (
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                  {toDos.map((toDo, index) => (
                    <DragabbleCard key={toDo} index={index} toDo={toDo} />
                  ))}
                  {magic.placeholder}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
      Minute
      <input
        value={minutes}
        onChange={onChangeMinutes}
        type="number"
        placeholder="Minute"
      />
      Hour
      <input
        value={hours}
        onChange={onChangeHours}
        type="number"
        placeholder="Hours"
      />
    </>
  );
}

export default App;
