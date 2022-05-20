import { useQuery } from "react-query";
import { FetchCoinTicker } from "../api";

interface IPriceProps {
  coinId: string;
}

interface IPrice {
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
  const { isLoading, data } = useQuery<IPrice[]>(["USD", coinId], () =>
    FetchCoinTicker(coinId)
  );

  return <h1>Price</h1>;
};

export default Price;
