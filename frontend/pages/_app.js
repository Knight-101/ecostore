import { Web3Provider } from "../contexts/Web3Context";
import "../styles/globals.css";
import "../styles/featured.css";
import "../styles/yourStores.css";
import "../styles/marketplaceHead.css";
import "../styles/navbar.css";
import "../styles/threeNFT.css";
import "../styles/createStore.css";
import Navbar from "../components/navbar";
import CreateProduct from "../components/CreateProduct";

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <Navbar />
      <Component {...pageProps} />
      <CreateProduct />
    </Web3Provider>
  );
}

export default MyApp;
