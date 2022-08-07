import React from "react";
import Buy from "./Buy";

export default function Product({ product }) {
  const { id, name, price, description, image_url } = product;

  return (
    <div>
      <div>
        <img src={image_url} alt={name} />
      </div>

      <div>
        <div>
          <div>{name}</div>
          <div>{description}</div>
        </div>

        <div>
          <div>{price} USDC</div>
          {/* Replace the IPFS component with the Buy component! */}
          <Buy itemID={id} />
        </div>
      </div>
    </div>
  );
}
