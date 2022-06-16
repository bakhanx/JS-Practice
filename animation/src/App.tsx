import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";

const Wrapper = styled(motion.div)`
  display: flex;
  /* max-width: 680px; */
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)<{ bgColor: string; repeatCnt?: number }>`
  width: 200px;
  height: 200px;
  background: ${(props) => props.bgColor};
  display: grid;
  grid-template-columns: repeat(${(props) => props.repeatCnt}, 1fr);
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
  background-color: #e9be75;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Svg = styled.svg`
  width: 300px;
  height: 300px;
  path {
    stroke: white;
    stroke-width: 2;
  }
`;

const svgVariants = {
  start: {
    fill: "rgba(255,255,255,0)",
    pathLength: 0,
  },
  end: {
    fill: "rgba(255,255,255,1)",
    pathLength: 1,
  },
};

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const WrapperColor = "linear-gradient(135deg, #f7fbb4, #86a006)";
  const gradient = useTransform(
    x,
    [-800, 0, 800],
    [
      "linear-gradient(135deg, rgb(247, 136, 136), rgb(253, 12, 12))",
      "linear-gradient(135deg, #3ee9ff, #171fff)",
      "linear-gradient(135deg, rgb(136, 250, 159), rgb(0, 182, 88))",
    ]
  );
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0.8, 1], [1, 2]);

  useEffect(() => {
    scrollYProgress.onChange(() => console.log(scrollYProgress.get()));
  }, [scrollYProgress]);

  const [showing, setshowing] = useState(false);
  const toggleShowing = () => {
    setshowing(!showing);
  };

  const boxVariants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateZ: 360,
    },
    leaving: {
      opacity: 0,
      scale: 0,
      y: 20,
    },
  };

  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);

  const onClickPrev = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };

  const onClickNext = () => {
    setBack(false);
    setVisible((prev) => (prev === 5 ? 5 : prev + 1));
  };


  const boxesVariants = {
    entry: (back: boolean) => ({
      x: back ? -500 : 500,
      opacity: 0,
      scale: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: (back: boolean) => ({
      x: back ? 500 : -500,
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.3,
      },
    }),
  };

  return (
    <>
      <Wrapper>
        <Box
          repeatCnt={2}
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

      <Wrapper style={{ background: WrapperColor }}>
        <BiggerBox ref={biggerBoxRef}>
          <Box
            bgColor={"tomato"}
            variants={guestureBoxVariants}
            drag
            dragSnapToOrigin
            dragElastic={0.5} // default : 0.5
            dragConstraints={biggerBoxRef}
            // dragConstraints={{top:-200, bottom:200, left:-200, right:200}}
            whileDrag="drag"
            whileHover="hover"
            whileTap="tap"
          >
            Drag me
          </Box>
        </BiggerBox>
      </Wrapper>

      <Wrapper style={{ background: gradient }}>
        <Box bgColor="#c23ffa" style={{ x, rotateZ }} drag="x"></Box>
        <button onClick={() => x.set(100)}>Click me</button>
      </Wrapper>

      <Wrapper>
        <Box bgColor="orange" style={{ scale: scale }}></Box>
      </Wrapper>

      <Wrapper style={{ background: gradient }}>
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <motion.path
            variants={svgVariants}
            initial="start"
            animate="end"
            transition={{
              default: { duration: 5 },
              fill: { duration: 1, delay: 2 },
            }}
            d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
          />
        </Svg>
      </Wrapper>

      <Wrapper style={{ flexDirection: "column" }}>
        <AnimatePresence>
          {showing ? (
            <Box
              variants={boxVariants}
              initial="initial"
              animate="visible"
              exit="leaving"
              bgColor="pink"
            />
          ) : null}
        </AnimatePresence>
        <button onClick={toggleShowing}>Click</button>
      </Wrapper>

      <Wrapper style={{ flexDirection: "column", backgroundColor: "tomato" }}>
        <AnimatePresence exitBeforeEnter custom={back}>
          <Box
            variants={boxesVariants}
            custom={back}
            initial="entry"
            animate="center"
            exit="exit"
            bgColor="white"
            key={visible}
            style={{ position: "absolute" }}
          >
            {visible}
          </Box>
        </AnimatePresence>

        {/* button */}
        <div style={{ flexDirection: "row" }}>
          <button
            onClick={onClickPrev}
            style={{ position: "relative", top: "200px" }}
          >
            Prev
          </button>
          <button
            onClick={onClickNext}
            style={{ position: "relative", top: "200px" }}
          >
            Next
          </button>
        </div>
      </Wrapper>
    </>
  );
}

export default App;
