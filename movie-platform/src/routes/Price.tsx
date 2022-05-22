import { useQuery } from "react-query";
import { FetchCoinTicker } from "../api";

interface IPriceProps {
  coinId: string;
}

interface IPriceUSD {
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

let Price = ({ coinId }: IPriceProps) => {
  const { isLoading, data } = useQuery<IPriceUSD>(["USD", coinId], () =>
    FetchCoinTicker(coinId)
  );
  return (
      <div>
        {isLoading ? (
          "Price Loading..."
        ) : (
          <>
            <div>ATH DATA : {data?.quotes.USD.ath_date}</div>
            <div>ATH PRICE : {data?.quotes.USD.ath_price}</div>
            <div>ATH DATE : {data?.quotes.USD.ath_date}</div>
            <div>ATH MARKET CAP : {data?.quotes.USD.market_cap}</div>
            <div>ATH PRICE : {data?.quotes.USD.price}</div>
            <div>ATH VOLUME 24H : {data?.quotes.USD.volume_24h}</div>
          </>
        )}
      </div>
  );
};

export default Price;
