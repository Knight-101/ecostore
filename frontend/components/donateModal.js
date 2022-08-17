import React from "react";

const DonateModal = ({ setter, title, ocf, closer }) => {
  const [token, setToken] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [basePrice, setBase] = React.useState(30);
  const [offsetPrice, setOffset] = React.useState(10);
  const changeBase = (e) => {
    setBase(e.target.value);
  };

  return (
    <div className="payment-wrap">
      <div className="payment-modal-main">
        <div className="payment-modal-header">Donate</div>
        <div className="payment-modal-body">
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
            <br />

            <input
              type="text"
              name=""
              id="sol-inp"
              value={basePrice}
              onChange={changeBase}
            />
            <br />

            <div className="base-price total-price"></div>

            <div className="button-confirm">
              <button className="payment-button" onClick={ocf}>
                <img src="/assets/wallet.png" style={{ height: 20 }} />
                Pay using wallet
              </button>
              <button className="payment-button" onClick={ocf}>
                <img src="/assets/qr.png" style={{ height: 20 }} />
                Scan QR Code
              </button>
            </div>
            <br />

            <button className="payment-button" onClick={closer}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
