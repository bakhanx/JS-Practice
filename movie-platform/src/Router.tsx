import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import { TopNav } from "./TopNav";

// Switch : 한번에 하나의 route를 렌더링

let Router = () => {
  return (
    
    <BrowserRouter>
      <TopNav />
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
