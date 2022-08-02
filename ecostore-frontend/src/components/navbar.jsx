import React from "react";
import "./navbar.css";
import ThreeNFT from "./threeNFT";

const NFTProgress = ({ level, money }) => {
  if (!level) {
    level = "seed";
  }
  if (!money) {
    money = 7;
  }
  const levelToRange = {
    seed: [0, 10],
    plant: [10, 20],
    tree_1: [20, 30],
    tree_2: [30, 50],
    forest: [50, 100],
  };

  const percent =
    (money - levelToRange[level][0]) /
    (levelToRange[level][1] - levelToRange[level][0]);
  return (
    <div className="nft-progress">
      <div className="nft-level-name">
        <div className="nft-level-title">Your CRB Level</div>
        <div className="nft-actual-level">{level}</div>
      </div>
      <div className="nft-progress-level">
        <div className="nft-progress-level-text">{levelToRange[level][0]}</div>
        <div className="nft-progress-bar">
          <div
            className="nav-inner-prog"
            style={{ width: `${percent * 100}%` }}
          ></div>
        </div>
        <div className="nft-progress-level-text">{levelToRange[level][1]}</div>
      </div>
      <div className="nft-prog-description">
        Level Up your NFT by offsetting your carbon emissions.
      </div>
    </div>
  );
};
const Navbar = () => {
  return (
    <div className="nav-main">
      <div className="nav-body">Logo here</div>
      <div className="nav-nft-contain">
        <NFTProgress level={"seed"} money={7} />
        <ThreeNFT type={"seed"} />
      </div>
    </div>
  );
};

export default Navbar;
