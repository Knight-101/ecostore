import React, { useContext, useEffect, useState } from "react";
import Web3Context from "../contexts/Web3Context";
import CreateStoreModal from "./createStore";
import { DisplayDiv } from "./featured";
// import meta from "../assets/metaverse.jpg";
const meta = "/assets/metaverse.jpg";

export const AddYourStore = ({ setIsOpen }) => {
  return (
    <div className="product-container">
      <div className="add-store-main" onClick={() => setIsOpen(true)}>
        <span>&#43;</span>
        Add Your Store
      </div>
    </div>
  );
};

const YourStores = ({ type, searchParam, customRef }) => {
  const { walletAddress, fetchMyStores, storeAdded } = useContext(Web3Context);
  const [isOpen, setIsOpen] = useState(false);
  const [myStores, setMyStores] = useState(null);
  useEffect(() => {
    const fetchStores = async () => {
      const stores = await fetchMyStores();
      stores && setMyStores([...stores]);
    };
    fetchStores();
  }, [walletAddress, storeAdded]);

  const testStores = [
    {
      image: "",
      name: "Metaverse",
      description: "Metaverse",
    },
  ];
  return (
    <>
      {isOpen && <CreateStoreModal setIsOpen={setIsOpen} />}
      <div
        className={`ys-header ${type === "search" ? "colour-search" : ""}`}
        customattr={searchParam}
      >
        {type === "search" ? "Search Results" : "Your Stores"}
      </div>
      <div className="ys-main" ref={customRef}>
        {type !== "search" && <AddYourStore setIsOpen={setIsOpen} />}
        {myStores?.map((store, index) => (
          <div className="product-container">
            <DisplayDiv
              key={index}
              image={store.image}
              name={store.name}
              description={store.description}
              id={store.id}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default YourStores;
