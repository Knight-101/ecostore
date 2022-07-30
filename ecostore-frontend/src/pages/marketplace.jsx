import React from "react";
import Featured from "../components/featured";
import MarketplaceHead from "../components/marketplaceHead";
import YourStores from "../components/yourStores";

const Marketplace = () => {
  return (
    <div>
      <MarketplaceHead />
      <Featured />
      <YourStores />
    </div>
  );
};

export default Marketplace;
