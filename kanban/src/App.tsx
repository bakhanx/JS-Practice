import { count } from "console";
import React from "react";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { replaceAt } from "react-query/types/core/utils";

import { useRecoilState } from "recoil";
import styled from "styled-components";
import { hoursSelector, minutesState, toDoState } from "./atom";
import { Board } from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

interface BoardsProps {
  count: number;
}

const Boards = styled.div<BoardsProps>`
  display: grid;
  width: 100vw;
  gap: 10px;
  grid-template-columns: repeat(${(props) => props.count}, 1fr);
`;



function App() {
  const [minutes, setMinutes] = useRecoilState(minutesState);
  const [hours, setHours] = useRecoilState(hoursSelector);
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
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
          <Boards count={toDoState?.key?.length}>
            {Object.keys(toDos).map((boardId) => (
              <Board
                key={boardId}
                toDos={toDos[boardId]}
                boardId={boardId}
              ></Board>
            ))}
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
