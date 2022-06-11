import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "#fdf4cf" : props.theme.cardColor};
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  /* transition: background-color 0.5s ease-in-out; */
  box-shadow: ${(props)=>props.isDragging ? "0px 2px 5px rgba(0,0,0,0.1)" : "none"};
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText : string;
  index: number;
}

const DragabbleCard = ({ toDoId, toDoText, index }: IDragabbleCardProps) => {
  return (
    <Draggable key={toDoId} draggableId={toDoId+""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DragabbleCard);
