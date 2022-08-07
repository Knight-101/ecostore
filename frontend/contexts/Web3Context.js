import { createContext, useEffect, useState, useMemo } from "react";
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Transaction,
} from "@solana/web3.js";
import {
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
  getMint,
} from "@solana/spl-token";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import BigNumber from "bignumber.js";
import products from "../pages/api/products.json";
import idl from "../idl/idl.json";
// import { toast } from "react-toastify";

// SystemProgram is a reference to the Solana runtime!
const { SystemProgram } = web3;
// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);
const opts = {
  preflightCommitment: "processed",
};

const Web3Context = createContext();

const network = clusterApiUrl("devnet");

const usdcAddress = new PublicKey(
  "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"
);

export const Web3Provider = (props) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const functionsToExport = {};

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(
      connection,
      window.solana,
      opts.preflightCommitment
    );
    return provider;
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            "Connected with Public Key:",
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  functionsToExport.connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  functionsToExport.buyProduct = async (order) => {
    try {
      const { buyer, orderID, itemID } = order;
      if (!buyer) {
        console.log("Missing buyer address");
      }

      if (!orderID) {
        console.log("Missing order ID");
      }

      const product = products.find((item) => item.id === itemID).price;
      const itemPrice = product.price;

      if (!itemPrice) {
        console.log("Item not found.");
      }

      const bigAmount = BigNumber(itemPrice);
      const sellerPublicKey = new PublicKey(product.sellerAddress);
      const buyerPublicKey = new PublicKey(walletAddress);

      const endpoint = clusterApiUrl(network);
      const connection = new Connection(endpoint);

      const buyerUsdcAddress = await getAssociatedTokenAddress(
        usdcAddress,
        buyerPublicKey
      );
      const shopUsdcAddress = await getAssociatedTokenAddress(
        usdcAddress,
        sellerPublicKey
      );
      const { blockhash } = await connection.getLatestBlockhash("finalized");

      // This is new, we're getting the mint address of the token we want to transfer
      const usdcMint = await getMint(connection, usdcAddress);

      const tx = new Transaction({
        recentBlockhash: blockhash,
        feePayer: buyerPublicKey,
      });

      // Here we're creating a different type of transfer instruction
      const transferInstruction = createTransferCheckedInstruction(
        buyerUsdcAddress,
        usdcAddress, // This is the address of the token we want to transfer
        shopUsdcAddress,
        buyerPublicKey,
        bigAmount.toNumber() * 10 ** (await usdcMint).decimals,
        usdcMint.decimals // The token could have any number of decimals
      );

      // The rest remains the same :)
      transferInstruction.keys.push({
        pubkey: new PublicKey(orderID),
        isSigner: false,
        isWritable: false,
      });

      tx.add(transferInstruction);

      const txHash = sendAndConfirmTransaction(connection, tx);

      return txHash;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <Web3Context.Provider
      value={{
        walletAddress,
        ...functionsToExport,
      }}
    >
      {props.children}
    </Web3Context.Provider>
  );
};
export default Web3Context;
