import React, { useContext } from "react";
import Web3Context from "../contexts/Web3Context";
import Buy from "./Buy";

export default function Product({ product, itemKey, owner }) {
  const { walletAddress } = useContext(Web3Context);
  const { id, name, price, image_url, filename, hash } = product;

  return (
    <div className="product-container" key={itemKey}>
      <div className="product-main">
        <div className="product-main-img">
          <img src={image_url} alt={name} />
        </div>

        <div className="product-main-content">
          <div className="product-main-blob">
            <div>{name}</div>
          </div>

          <div className="product-main-buy">
            <div>{price} USDC</div>
          </div>
          {walletAddress && walletAddress !== owner && (
            <Buy itemID={id} price={price} filename={filename} hash={hash} />
          )}
        </div>
      </div>
    </div>
  );
}
