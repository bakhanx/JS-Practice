import React from "react";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getModeForUsageLocation } from "typescript";
import { hoursSelector, minutesState } from "./atom";

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
const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
`;

const toDos = ["a", "b", "c", "D", "E", "F", "H", "I", "J"];

function App() {
  const [minutes, setMinutes] = useRecoilState(minutesState);
  const [hours, setHours] = useRecoilState(hoursSelector);

  const onChangeMinutes = (event: React.FormEvent<HTMLInputElement>) =>
    setMinutes(+event.currentTarget.value);

  const onChangeHours = (event: React.FormEvent<HTMLInputElement>) =>
    setHours(+event.currentTarget.value);

  const onDragEnd = () => {};
  return (
    <>
      {/* DragDropContext -> Droppable -> Draggable */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {(magic) => (
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                  {toDos.map((toDo,index) => (
                    <Draggable draggableId={toDo} index={index}>
                      {(magic) => (
                        <Card
                          ref={magic.innerRef}
                          {...magic.dragHandleProps}
                          {...magic.draggableProps}
                        >
                          {toDo}
                        </Card>
                      )}
                    </Draggable>
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
