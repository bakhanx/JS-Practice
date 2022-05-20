import { lazy, useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { FetchCoinInfo, FetchCoinTicker } from "../api";
import Chart from "./Chart";
import Price from "./Price";
import { Helmet } from "react-helmet";

interface IRouteParams {
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

const OverView = styled.div`
  background-color: black;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;
const OverViewItem = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 10px;

  span {
    padding: 5px;
  }

  span:first-child {
    font-size: small;
  }
`;
const Description = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 25px 0px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 16px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 7px 0px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
    padding: 3px;
  }
  &:hover {
    color: tomato;
  }
`;


interface IRouteState {
  name: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  description: string;
  message: string;
  open_source: boolean;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface ITickerData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

let Coin = () => {
  const { coinId } = useParams<IRouteParams>();
  const { state } = useLocation<IRouteState>(); // link to 에서 state
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => FetchCoinInfo(coinId)
  );

  const { isLoading: tickerLoading, data: tickerData } = useQuery<ITickerData>(
    ["ticker", coinId],
    () => FetchCoinTicker(coinId),
    {
      refetchInterval: 5000,
    }
  );

  const loading = infoLoading || tickerLoading;

  return (
    <>
     
      <Container>
        <Helmet>
          <title>
            {state?.name
              ? `${state.name} - BaKhaN Bit`
              : loading
              ? "Loading..."
              : `${infoData?.name} - BakhaN Bit`}
          </title>
        </Helmet>

        <Header>
          <Title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </Title>
        </Header>

        {loading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <OverView>
              <OverViewItem>
                <span>Rank</span>
                <span>{infoData?.rank}</span>
              </OverViewItem>
              <OverViewItem>
                <span>Symbol</span>
                <span>${infoData?.symbol}</span>
              </OverViewItem>
              <OverViewItem>
                <span>Open Source</span>
                <span>{infoData?.open_source ? "Yes" : "No"}</span>
              </OverViewItem>
            </OverView>
            <Description>{infoData?.description}</Description>
            <OverView>
              <OverViewItem>
                <span>Price</span>
                <span>
                  {(tickerData?.quotes.USD.price as Number) > 10
                    ? tickerData?.quotes.USD.price.toFixed(2)
                    : tickerData?.quotes.USD.price.toFixed(4)}
                </span>
              </OverViewItem>
              <OverViewItem>
                <span>Total Supply</span>
                <span>{tickerData?.total_supply}</span>
              </OverViewItem>
            </OverView>

            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>chart</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>price</Link>
              </Tab>
            </Tabs>

            <Switch>
              <Route path={`/${coinId}/chart`}>
                <Chart coinId={coinId} />
              </Route>
              <Route path={`/${coinId}/price`}>
                {/* <Price></Price> */}
              </Route>
            </Switch>
          </>
        )}
      </Container>
    </>
  );
};

export default Coin;
