import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 5px 10px;
  padding-top: 30px;
  border-radius: 5px;
  min-height: 300px;
`;

interface BoardProps {
  toDos: string[];
  boardId: string;
}

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

export const Board = ({ toDos, boardId }: BoardProps) => {
  return (
    <>
      <Wrapper>
        <Title>{boardId}</Title>
        <Droppable droppableId={boardId}>
          {(magic) => (
            <div ref={magic.innerRef} {...magic.droppableProps}>
              {toDos.map((toDo, index) => (
                <DragabbleCard key={toDo} index={index} toDo={toDo} />
              ))}
              {magic.placeholder}
            </div>
          )}
        </Droppable>
      </Wrapper>
    </>
  );
};
