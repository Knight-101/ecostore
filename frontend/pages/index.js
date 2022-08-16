import React, { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
// import TOPOLOGY from "vanta/dist/vanta.fog.min";
// import * as P5 from "p5";
import { polyfill } from "seamless-scroll-polyfill";
import { useEffect } from "react";
import Web3Context from "../contexts/Web3Context";

function App() {
  const [vantaEffect, setVantaEffect] = useState(0);
  const scrollRef = useRef(null);
  const myRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   if (!vantaEffect) {
  //     setVantaEffect(
  //       TOPOLOGY({
  //         el: myRef.current,
  //         P5,
  //         mouseControls: true,
  //         touchControls: true,
  //         gyroControls: false,
  //         minHeight: 200.0,
  //         minWidth: 200.0,
  //         scale: 1.0,
  //         color: "0x89964e",
  //         scaleMobile: 1.0,
  //       })
  //     );
  //   }
  //   setMounted(true);

  //   return () => {
  //     if (vantaEffect) vantaEffect.destroy();
  //   };
  // }, [vantaEffect]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (typeof window !== "undefined") {
    // Client-side-only code
    polyfill();
  }
  return (
    <div>
      <div className="svgbg" ref={myRef}></div>
      <section id="about">
        <h3>What is Ecostore?</h3>
        <ul>
          <li>
            Ecostore is a whitelabel marketplace built on solana blockchain,
            where merchants can easily open their stores and list their digital
            products to sell.
          </li>
          <li>
            {" "}
            All the purchases are done in USDC avoiding crypto volatility and
            giving credibilty to merchants.
          </li>
          <li>
            {" "}
            There is a green initiative to this project. Users can offset their
            carbon emissions by donating to NGOs. They have to mint aa Carbon
            NFT which evolves with amount of carbon offsets bought.
          </li>
        </ul>
      </section>
      <section id="onboarding">
        <h3>Merchant Onboarding</h3>
        <ul>
          <li>
            Get a <a href="https://phantom.app/">phantom</a> wallet and create
            an account. Get some SOL and USDC.
          </li>
          <li> Mint a Carbon NFT to leverage carbon offsets you buy.</li>
          <li> Create a store by providing few details.</li>
          <li> Upload your product and its done!</li>
        </ul>
      </section>
      <section id="CRB">
        <h3>What is Carbon NFT?</h3>
        <p>
          Do you know the carbon footprint of Bitcoin, as of year 2021, is 37
          Megatons of CO2 every year? Moreover, carbon footprint a single Eth
          transaction is 102.38 KG CO2. However, Solana is eco-friendly compared
          to its peers but still the amount stands at 2524 tonnes of C02 per
          year. Ecostore helps you to make the transactions carbon neutral by
          offseting your transactions or directly donating to{" "}
          <a href="https://carbonfund.org/">Carbonfund.org</a>. Carbon NFT is an
          evolving nft which incentivizes carbon offsets. The more you offset,
          the more it evolves. Go ahead and mint CRB to make your contribution
          to a new green world!
        </p>
      </section>
    </div>
  );
}

export default App;
