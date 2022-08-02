import React from "react";
import "./App.css";
import ThreeNFT from "./components/threeNFT";
import Marketplace from "./pages/marketplace";

function App() {
  return (
    <div>
      <Marketplace />
      <ThreeNFT type={"plant"}/>
    </div>
  );
}

export default App;
