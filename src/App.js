import { BrowserRouter,Switch,Route} from "react-router-dom";

import Header from "./components/Layout/Header";
import Home from "./pages/Home";
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Header />
      <Switch>
        <Route path="/:poetUrl" exact>
          <h1>something else</h1>
        </Route>
        <Route path="/" axact>
          <Home />
        </Route>
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
