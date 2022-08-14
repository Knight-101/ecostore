import React from "react";
import { NFTProgress } from "../components/navbar.js";
import ThreeNFT from "../components/threeNFT.js";

const InfoPanel = ({ setter }) => {
  return (
    <div className="tree-page-wrap">
      <button
        className="tree-page-button"
        onClick={() => setter((val) => !val)}
      >
        Info
      </button>
      <div className="one-row-nft">
        <img src="/assets/nft_seed.png" />
        <div className="one-row-nft-text"> Level 1</div>
      </div>
      <div className="one-row-nft">
        <img src="/assets/nft_plant.png" />
        <div className="one-row-nft-text"> Level 2</div>
      </div>
      <div className="one-row-nft">
        <img src="/assets/nft_tree_1.png" />
        <div className="one-row-nft-text"> Level 3</div>
      </div>
      <div className="one-row-nft">
        <img src="/assets/nft_tree_2.png" />
        <div className="one-row-nft-text"> Level 4</div>
      </div>
      <div className="one-row-nft">
        <img src="/assets/nft_forest.png" />
        <div className="one-row-nft-text"> Level 5</div>
      </div>
    </div>
  );
};

const OffsetHistory = () => {
  return null;
};
const TreePage = () => {
  const [TypeNFT, setTypeNFT] = React.useState(4);
  const [infoDisplay, setInfoDisplay] = React.useState(false);
  return (
    <div className="tree-page-main">
      {infoDisplay && <InfoPanel setter={setInfoDisplay} />}
      <div className="tree-page-head">
        <div className="tree-page-header">Header here</div>
        <div className="tree-page-header-text">
          <span>
            Supporting text here. Supporting text here. Supporting text here.
          </span>
          <button
            className="tree-page-button"
            onClick={() => setInfoDisplay((val) => !val)}
          >
            What is CRB?
          </button>
        </div>
      </div>
      <div className={`your-nft-panel ${infoDisplay && "nft-panel-hidden"}`}>
        <ThreeNFT pageType="page" type={TypeNFT} />
        <div className="your-nft-panel-text">
          {/* <div className="tree-page-header">Header here</div>
          <div className="tree-page-header-text">
            <span>
              Supporting text here. Supporting text here. Supporting text here.
            </span>
          </div> */}
        </div>
        <NFTProgress />
      </div>
    </div>
  );
};

export default TreePage;
