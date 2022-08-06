import React from "react";
import { DisplayDiv } from "./featured";
// import meta from "../assets/metaverse.jpg";
const meta = "/assets/metaverse.jpg";

const AddYourStore = () => {
  return (
    <div className="add-store-main">
      <span>&#43;</span>
      Add Your Store
    </div>
  );
};

const YourStores = ({ type, searchParam, customRef }) => {
  return (
    <>
      <div
        className={`ys-header ${type === "search" ? "colour-search" : ""}`}
        customattr={searchParam}
      >
        {type === "search" ? "Search Results" : "Your Stores"}
      </div>
      <div className="ys-main" ref={customRef}>
        {type !== "search" && <AddYourStore />}
        <DisplayDiv image={meta} />
        <DisplayDiv image={meta} />
        <DisplayDiv image={meta} />
        <DisplayDiv image={meta} />
      </div>
    </>
  );
};

export default YourStores;
