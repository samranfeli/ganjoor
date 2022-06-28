import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import PoetDetail from "../../pages/PoetDetail";
import PoemDetail from "../../pages/PoemDetail";
import Home from "../../pages/Home";
import PoemPart from "../../pages/PoemPart";

const Layout = () => (
  <>
      <Header />
      <Switch>
        <Route path="/:poetUrl" exact >
          <PoetDetail />
        </Route>
        <Route path="/:poetUrl/:poemUrl" exact >
          <PoemDetail />
        </Route>
        <Route path="/:poetUrl/:poemUrl/:partUrl" exact >
          <PoemPart />
        </Route>
        <Route path="/" axact>
          <Home />
        </Route>
      </Switch>
  </>
);
export default Layout;
