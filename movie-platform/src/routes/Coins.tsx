import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FetchCoins } from "../api";

const Container = styled.div`
  padding: 30px 20px;
  max-width: 480px;
  margin: auto;
`;

const Header = styled.header`
  height: 10vh;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${props=>props.theme.listBgColor};
  color: ${(props) => props.theme.textColor};
  border: 1px solid white;
  border-radius: 15px;
  margin-bottom: 10px;
  font-weight: bold;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  font-weight:bold;
  @media (max-width:800px){
    font-size:32px;
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  font-size: large;
`;

const Img = styled.img`
  width: 7%;
  margin-right: 10px;
`;

const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "usdt-tether",
    name: "Tether",
    symbol: "USDT",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
  {
    id: "usdc-usd-coin",
    name: "USD Coin",
    symbol: "USDC",
    rank: 4,
    is_new: false,
    is_active: true,
    type: "token",
  },
];



interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  tyep: string;
}

let Coins = () => {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", FetchCoins);

  return (
    <>
      <Container>
        <Helmet>
          <title>BaKhaN Bit</title>
        </Helmet>
        <Header>
          <Title>Coin Realtime</Title>
        </Header>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <CoinList>
            {data?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link
                  to={{
                    pathname: `/${coin.id}`,
                    state: {
                      name: coin.name,
                    },
                  }}
                >
                  <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinList>
        )}
      </Container>
    </>
  );
};

export default Coins;
