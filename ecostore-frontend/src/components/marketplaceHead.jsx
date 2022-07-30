import React from "react";
import "./marketplaceHead.css";

const MarketplaceHead = (props) => {
  const handleChange = (e) => {
    props.setter(e.target.value);
  };
  return (
    <>
      <div className="mp-head-main">Marketplace</div>
      <div className="sd-wrap">
        <div className="marketplace-search">
          <input
            type="text"
            placeholder="Search using store or seller names"
            className="mp-search-input"
            value={props.param}
            onChange={handleChange}
          />
          <div className="search-button" onClick={props.getter}>
            O
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketplaceHead;
