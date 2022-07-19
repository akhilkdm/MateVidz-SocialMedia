import { BrowserRouter } from "react-router-dom";
import './axios/global'

import Router from "./Router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}
export default App;
