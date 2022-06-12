import React from "react";
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

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
`;

function App() {
  return (
    <>
      <Wrapper>
        <Box
          transition={{ type: "spring", delay: 0.5 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotateZ: 360 }}
        />
      </Wrapper>
    </>
  );
}

export default App;
