import { BrowserRouter} from "react-router-dom";

import Layout from "./components/Layout/Layout";
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="text-base 2xl:text-lg">
        <Layout />
      </div>
    </BrowserRouter>
  );
}

export default App;
