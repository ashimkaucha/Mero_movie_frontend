import Header from "./header/header";
import Footer from "./footer/footer";
import Mid from "./mid/mid";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header> </Header>
      <Mid></Mid>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
