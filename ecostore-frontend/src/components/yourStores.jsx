import React from "react";
import { DisplayDiv } from "./featured";
import "./yourStores.css";
import meta from "../assets/metaverse.jpg";

const AddYourStore = () => {
  return (
    <div className="add-store-main">
      <span>&#43;</span>
      Add Your Store
    </div>
  );
};

const YourStores = ({ type, searchParam }) => {
  return (
    <>
      <div
        className={`ys-header ${type === "search" ? "colour-search" : ""}`}
        customattr={searchParam}
      >
        {type === "search" ? "Search Results" : "Your Stores"}
      </div>
      <div className="ys-main">
        <DisplayDiv image={meta} />
        <DisplayDiv image={meta} />
        <DisplayDiv image={meta} />
        <DisplayDiv image={meta} />
        {type !== "search" && <AddYourStore />}
      </div>
    </>
  );
};

export default YourStores;
