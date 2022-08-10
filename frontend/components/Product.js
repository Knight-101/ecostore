import React from "react";
import Buy from "./Buy";

export default function Product({ product }) {
  const { id, name, price, description, image_url } = product;

  return (
    <div className="product-container">
    <div className="product-main">
      <div className="product-main-img">
        <img src={image_url} alt={name} />
      </div>

      <div className="product-main-content">
        <div className="product-main-blob">
          <div>{name}</div>
          <div>{description}</div>
        </div>

        <div className="product-main-buy">
          <div>{price} USDC</div>
          {/* Replace the IPFS component with the Buy component! */}
          {/* <Buy itemID={id} /> */}
        </div>
      </div>
    </div>
    </div>
  );
}
