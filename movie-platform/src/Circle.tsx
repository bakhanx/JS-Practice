import { useState } from "react";
import styled from "styled-components";


const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
  color: ${(props) => props.theme.textColor};
`;

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

let Circle = ({ bgColor, borderColor, text = "default text" }: CircleProps) => {
  const [value, setValue] = useState(0);
  setValue(2);
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
};

export default Circle;
