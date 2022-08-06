import React, { useState } from "react";
const search = "/assets/search.svg"

const MarketplaceHead = (props) => {
  const handleChange = (e) => {
    props.setter(e.target.value);
  };

  const checkEnter = (e) => {
    if (e.key === "Enter") {
      props.getter();
    }
  };
  const [left, setLeft] = useState(true);
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
            onKeyDown={checkEnter}
          />
          <div className="search-button" onClick={props.getter}>
            <img src={search} alt="" style={{ height: 25 }} />
          </div>
        </div>
      </div>
      <div className="sd-switch">
        <div className="switch-wrap">
          <div className="switch-select" onClick={() => props.mpsetter(true)}>
            Marketplace
          </div>
          <div className="switch-select" onClick={() => props.mpsetter(false)}>
            Your Stores
          </div>
          <div
            className="switch-currently-on"
            style={{ left: props.mpvalue ? 0 : 150 }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default MarketplaceHead;
