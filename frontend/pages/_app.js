import { Web3Provider } from "../contexts/Web3Context";
import "../styles/globals.css";
import "../styles/featured.css";
import "../styles/yourStores.css";
import "../styles/marketplaceHead.css";
import "../styles/navbar.css";
import "../styles/threeNFT.css";
import "../styles/createStore.css";
import "../styles/orders.css";
import "../styles/productStyles.css"
import Navbar from "../components/navbar";
import CreateProduct from "../components/CreateProduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <ToastContainer />
      <Navbar />
      <Component {...pageProps} />
      {/* <CreateProduct /> */}
    </Web3Provider>
  );
}

export default MyApp;
