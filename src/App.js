import { BrowserRouter} from "react-router-dom";

import Layout from "./components/Layout/Layout";
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
