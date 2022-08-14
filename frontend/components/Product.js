import React from "react";
import Buy from "./Buy";

export default function Product({ product, itemKey }) {
  const { id, name, price, image_url, filename, hash } = product;

  return (
    <div className="product-container" key={itemKey}>
      <div className="product-main">
        <div className="product-main-img">
          <img style={{ height: "200px" }} src={image_url} alt={name} />
        </div>

        <div className="product-main-content">
          <div className="product-main-blob">
            <div>{name}</div>
          </div>

          <div className="product-main-buy">
            <div>{price} USDC</div>
            {/* Replace the IPFS component with the Buy component! */}
            <Buy itemID={id} price={price} filename={filename} hash={hash} />
          </div>
        </div>
      </div>
    </div>
  );
}
