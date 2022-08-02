import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import ThreeNFT from "./components/threeNFT";
import Marketplace from "./pages/marketplace";

function App() {
  return (
    <div>
      <Navbar />
      <Marketplace />
    </div>
  );
}

export default App;
