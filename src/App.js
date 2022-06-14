import {
  BrowserRouter,
} from "react-router-dom";

import Header from "./components/Layout/Header";
import Home from "./pages/Home";
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Header />
      <Home />
      </div>
    </BrowserRouter>
  );
}

export default App;
