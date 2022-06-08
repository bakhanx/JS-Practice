import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from 'react';

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
`;

interface IDragabbleCardProps{
    toDo:string;
    index:number;
}

const DragabbleCard = ({toDo, index} : IDragabbleCardProps) => {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
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
  );
};

export default React.memo(DragabbleCard);