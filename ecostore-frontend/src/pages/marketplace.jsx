import React from "react";
import { useState } from "react";
import Featured from "../components/featured";
import MarketplaceHead from "../components/marketplaceHead";
import YourStores from "../components/yourStores";

const Marketplace = () => {
  const [searchParam, setSearchParam] = useState("");
  const [isSearch, setSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [passedParam, setPassedParam] = useState("");

  const handleSearch = () => {
    setSearch(false);
    // set search data to data fetched from backend
    setSearchData([1, 2, 3, 4, 5]);
    setSearch(true);
    setPassedParam(searchParam);
  };
  return (
    <div>
      <MarketplaceHead
        param={searchParam}
        setter={setSearchParam}
        getter={handleSearch}
      />
      {isSearch && <YourStores type={"search"} searchParam={[passedParam]} />}
      <Featured />
      <YourStores />
    </div>
  );
};

export default Marketplace;
