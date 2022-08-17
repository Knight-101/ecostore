import React, { useContext, useEffect } from "react";
import Web3Context from "../contexts/Web3Context";

const PaymentModal = ({ setIsOpen, buyFunc, name, image, price }) => {
  const { calculateOffset } = useContext(Web3Context);

  const [token, setToken] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [basePrice, setBase] = React.useState(price);
  const [offsetPrice, setOffset] = React.useState(null);

  useEffect(() => {
    const func = async () => {
      if (checked) {
        const amount = await calculateOffset();
        setOffset(amount);
      } else {
        setOffset(null);
      }
    };
    func();
  }, [checked]);
  return (
    <div className="payment-wrap">
      <div className="payment-modal-main">
        <div className="payment-modal-header">Buy Product</div>
        <div className="payment-modal-body">
          <div className="payment-modal-image">
            <img src={image} className="payment-product-image" />
            <div className="image-caption">{name}</div>
          </div>
          <div className="transaction-summary">
            <div className="ts-wrap">
              {/* <div className="ts-text">Selected Token</div> */}
              <div className="token-switch">
                <div
                  className={`tok tok-sol ${token && "selected-token"}`}
                  onClick={() => setToken(false)}
                >
                  <img src="/assets/sol.png" className="coin-img" />
                </div>
                <div
                  className={`tok tok-right ${!token && "selected-token"}`}
                  onClick={() => setToken(false)}
                >
                  <img src="/assets/usdc.png" className="coin-img" />
                </div>
              </div>
            </div>
            <br />
            <div className="base-price">
              <div className="price-desc">Price</div>
              <div className="price-value">
                {token ? (
                  <img src="/assets/sol_coin.png" className="img-sol" />
                ) : (
                  <img src="/assets/usdc_coin.png" />
                )}
                {basePrice}
              </div>
            </div>
            <div className="base-price">
              <div className="price-desc-check">
                <div className="offset-checkbox">
                  <div
                    className={`custom-checkbox ${checked && "custom-checked"}`}
                    onClick={() => setChecked(!checked)}
                  ></div>
                </div>
                Offset Emissions
              </div>
              {offsetPrice && (
                <div className="price-value">
                  {token ? (
                    <img src="/assets/sol_coin.png" className="img-sol" />
                  ) : (
                    <img src="/assets/usdc_coin.png" />
                  )}
                  {offsetPrice}
                </div>
              )}
            </div>
            <div className="base-price total-price">
              <div className="price-desc">Total</div>
              <div className="price-value">
                {token ? (
                  <img src="/assets/sol_coin.png" className="img-sol" />
                ) : (
                  <img src="/assets/usdc_coin.png" />
                )}
                {offsetPrice ? parseFloat(basePrice) + offsetPrice : basePrice}
              </div>
            </div>

            <div className="button-confirm">
              <button
                className="payment-button"
                onClick={async () => {
                  await buyFunc(checked);
                }}
              >
                <img src="/assets/wallet.png" style={{ height: 20 }} />
                Pay using wallet
              </button>
              <button
                className="payment-button-disable"
                disable
                style={{ opacity: "0.5" }}
              >
                <img src="/assets/qr.png" style={{ height: 20 }} />
                Scan QR Code
              </button>
            </div>
          </div>
        </div>
        <button
          className="payment-button"
          style={{ margin: "auto", marginTop: "1rem" }}
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
