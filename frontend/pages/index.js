import React from "react";
// import * as P5 from "p5";
import { polyfill } from "seamless-scroll-polyfill";
import FadeIn from "react-fade-in";

const CustomButton = ({ inner }) => {
  return (
    <div class="button">
      <span class="button__mask"></span>
      <span class="button__text">{inner}</span>
      <span class="button__text button__text--bis">{inner}</span>
    </div>
  );
};
function App() {
  // useEffect(() => {
  //   console.log("mounted");
  //   const p5 = require("p5");
  //   if (!vantaEffect) {
  //     setVantaEffect(
  //       TOPOLOGY({
  //         el: myRef.current,
  //         p5: p5,
  //         mouseControls: true,
  //         touchControls: true,
  //         gyroControls: false,
  //         minHeight: 200.0,
  //         minWidth: 200.0,
  //         scale: 1.0,
  //         scaleMobile: 1.0,
  //         color: 0x192364,
  //         backgroundColor: 0x111111,
  //       })
  //     );
  //   }
  //   setMounted(true);

  //   return () => {
  //     if (vantaEffect) vantaEffect.destroy();
  //   };
  // }, [vantaEffect]);

  if (typeof window !== "undefined") {
    // Client-side-only code
    polyfill();
  }

  return (
    <div className="index">
      {/* <div className="svgbg" id="svgbg" ref={myRef}></div> */}
      <FadeIn visible={true}>
        <section id="landed">
          <div className="landed-container">
            <img src="/assets/ecostore_2.svg" alt="logo" id="landed-image" />
            <div className="landed-buttons">
              <a href="/marketplace">
                <CustomButton inner={"Marketplace"} />
              </a>
              <a href="#about">
                <CustomButton inner={"About EcoStore"} />
              </a>
            </div>
          </div>
        </section>
        <section id="about" className="sec">
          <h3>What is Ecostore?</h3>
          <div className="inner-sec">
            <div>
              Ecostore is a whitelabel marketplace built on solana blockchain,
              where merchants can easily open their stores and list their
              digital products to sell.
            </div>
            <div>
              All the purchases are done in USDC avoiding crypto volatility and
              giving credibilty to merchants.
            </div>
            <div>
              There is a green initiative to this project. Users can offset
              their carbon emissions by donating to NGOs. They have to mint aa
              Carbon NFT which evolves with amount of carbon offsets bought.
            </div>
          </div>
        </section>
        <section id="onboarding" className="sec">
          <h3>Merchant Onboarding</h3>
          <div className="inner-sec">
            <div>
              Get a{" "}
              <a href="https://phantom.app/" target="_blank">
                phantom
              </a>{" "}
              wallet and create an account. Get some SOL and USDC.
            </div>
            <div> Mint a Carbon NFT to leverage carbon offsets you buy.</div>
            <div> Create a store by providing few details.</div>
            <div> Upload your product and its done!</div>
          </div>
        </section>
        <section id="CRB" className="sec">
          <h3>What is Carbon NFT?</h3>
          <div className="inner-sec">
            <div>
              Do you know the carbon footprint of Bitcoin, as of year 2021, is
              37 Megatons of CO2 every year? Moreover, carbon footprint a single
              Eth transaction is 102.38 KG CO2. However, Solana is eco-friendly
              compared to its peers but still the amount stands at 2524 tonnes
              of C02 per year. Ecostore helps you to make the transactions
              carbon neutral by offseting your transactions or directly donating
              to{" "}
              <a href="https://carbonfund.org/" target="_blank">
                Carbonfund.org.
              </a>
            </div>
            <div>
              Carbon NFT is an evolving nft which incentivizes carbon offsets.
              The more you offset, the more it evolves. Go ahead and mint CRB to
              make your contribution to a new green world!
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}

export default App;
