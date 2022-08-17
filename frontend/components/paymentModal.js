import React from "react";

const PaymentModal = ({ setter, title }) => {
  const [token, setToken] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [basePrice, setBase] = React.useState(30);
  const [offsetPrice, setOffset] = React.useState(10);
  return (
    <div className="payment-wrap">
      <div className="payment-modal-main">
        <div className="payment-modal-header">Buy Product</div>
        <div className="payment-modal-body">
          <div className="payment-modal-image">
            <img src="/assets/nft_seed.png" className="payment-product-image" />
            <div className="image-caption">Product Name</div>
            <div className="image-caption-secondary">by Seller Name</div>
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
              <div className="price-desc">Base Price</div>
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
              <div className="price-value">
                {token ? (
                  <img src="/assets/sol_coin.png" className="img-sol" />
                ) : (
                  <img src="/assets/usdc_coin.png" />
                )}
                {offsetPrice}
              </div>
            </div>
            <div className="base-price total-price">
              <div className="price-desc">Total</div>
              <div className="price-value">
                {token ? (
                  <img src="/assets/sol_coin.png" className="img-sol" />
                ) : (
                  <img src="/assets/usdc_coin.png" />
                )}
                {basePrice + offsetPrice * (checked ? 1 : 0)}
              </div>
            </div>

            <div className="button-confirm">
              <button className="payment-button">
                <img src="/assets/wallet.png" style={{ height: 20 }} />
                Pay using wallet
              </button>
              <button className="payment-button">
                <img src="/assets/qr.png" style={{ height: 20 }} />
                Scan QR Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
