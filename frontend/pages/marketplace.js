import React, { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import Featured from "../components/featured";
import MarketplaceHead from "../components/marketplaceHead";
import YourStores from "../components/yourStores";
import { polyfill } from "seamless-scroll-polyfill";
import { useEffect } from "react";
import Navbar from "../components/navbar";
import Web3Context from "../contexts/Web3Context";

const Marketplace = () => {
  const { fetchAllStores, storeAdded } = useContext(Web3Context);
  const [searchParam, setSearchParam] = useState("");
  const [stores, setStores] = useState(null);
  const [isSearch, setSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [passedParam, setPassedParam] = useState("");
  const [market, setMarket] = useState(true);
  const scrollRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (typeof window !== "undefined") {
    // Client-side-only code
    polyfill();
  }

  // const handleSearch = () => {
  //   setSearch(false);
  //   // set search data to data fetched from backend
  //   setSearchData([1, 2, 3, 4, 5]);
  //   setSearch(true);
  //   setMarket(true);
  //   setPassedParam(searchParam);
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // };
  useEffect(() => {
    const fetchStores = async () => {
      const stores = await fetchAllStores();
      stores && setStores([...stores]);
    };
    fetchStores();
  }, [storeAdded]);
  useEffect(() => {
    if (isSearch) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <MarketplaceHead
          param={searchParam}
          setter={setSearchParam}
          mpvalue={market}
          mpsetter={setMarket}
        />
        {market ? mounted && <Featured stores={stores} /> : <YourStores />}
        {/* {isSearch && market && (
          <YourStores
            type={"search"}
            searchParam={[passedParam]}
            customRef={scrollRef}
          />
        )} */}
      </div>{" "}
    </>
  );
};

export default Marketplace;
