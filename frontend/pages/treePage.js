import React from "react";

const TreePage = () => {
  return (
    <div className="tree-page-wrap">
      <div className="one-row-nft">
        <img src="/assets/nft_seed.png" />
        <div className="one-row-nft-text"> Level 1</div>
      </div>
      <div className="one-row-nft">
        <img src="/assets/nft_plant.png" />
        <div className="one-row-nft-text"> Level 2</div>
      </div>
      <div className="one-row-nft your-nft-level">
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

export default TreePage;
