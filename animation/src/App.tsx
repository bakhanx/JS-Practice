import React, { useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)<{ bgColor: string , repeatCnt?:number}>`
  width: 200px;
  height: 200px;
  background: ${(props) => props.bgColor};
  display: grid;
  grid-template-columns: repeat(${(props)=>props.repeatCnt}, 1fr);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  align-items: center;
`;

const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const circleVariants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {},
  },
};

const Circle = styled(motion.div)`
  background-color: white;
  place-self: center;
  height: 70px;
  width: 70px;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const guestureBoxVariants = {
  hover: {
    rotateZ: 90,
  },
  tap: {
    borderRadius: "40px",
  },
  drag: {
    backgroundColor: "#41acfe",
    transition: { duration: 0.2 },
  },
};

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  border-radius: 15px;
  background-color: purple;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Wrapper>
        <Box repeatCnt={2}
          bgColor={"#d60bf6fa"}
          variants={boxVariants}
          initial="start"
          animate="end"
        >
          <Circle variants={circleVariants} />
          <Circle variants={circleVariants} />
          <Circle variants={circleVariants} />
          <Circle variants={circleVariants} />
        </Box>
      </Wrapper>

      <Wrapper>
        <BiggerBox ref={biggerBoxRef}>
          <Box
            bgColor={"white"}
            variants={guestureBoxVariants}
            drag
            dragSnapToOrigin
            dragElastic={0.5} // default : 0.5
            dragConstraints={biggerBoxRef}
            // dragConstraints={{top:-200, bottom:200, left:-200, right:200}}
            whileDrag="drag"
            whileHover="hover"
            whileTap="tap"
          >Drag me</Box>
        </BiggerBox>
      </Wrapper>
    </>
  );
}

export default App;
