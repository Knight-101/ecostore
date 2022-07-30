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

const YourStores = (props) => {
  return (
    <>
      <div className="ys-header">Your Stores</div>
      <div className="ys-main">
        <DisplayDiv image={meta} />
        <DisplayDiv image={meta} />
        <DisplayDiv image={meta} />
        <DisplayDiv image={meta} />
        <AddYourStore />
      </div>
    </>
  );
};

export default YourStores;
