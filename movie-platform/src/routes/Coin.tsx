import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

interface RouteParams {
  coinId: string;
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: auto;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Header = styled.header`
  height: 10vh;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  font-size: large;
`;

interface RouteState{
  name:string
}


let Coin = () => {
  const { coinId } = useParams<RouteParams>();
  const [loading, setLoading] = useState(true);
  const {state} = useLocation<RouteState>(); // link to 에서 state 넘겨준것 사용
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading"} </Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
};

export default Coin;
