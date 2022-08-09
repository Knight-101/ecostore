import { createContext, useEffect, useState, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
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
import { toast } from "react-toastify";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import BigNumber from "bignumber.js";
import products from "../pages/api/products.json";
import idl from "../idl/idl.json";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);
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
      toast.success("Wallet Connected!");
    } else {
      toast.info("No wallet found. Get a phantom wallet!");
    }
  };
  functionsToExport.fetchAllStores = async () => {
    let { data, error } = await supabase
      .from("stores")
      .select("name, description, image")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    console.log(data);
    return data;
  };
  functionsToExport.fetchMyStores = async () => {
    let { data, error } = await supabase
      .from("stores")
      .select("name, description, image")
      .eq("owner", walletAddress)
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    console.log(data);
    return data;
  };

  functionsToExport.createStore = async (name, description, image) => {
    if (!walletAddress) {
      toast.error("Wallet not connected!");
      return;
    }
    let { data, error } = await supabase.from("stores").insert([
      {
        name: name,
        description: description,
        image: image,
        owner: walletAddress,
      },
    ]);
    if (error) {
      console.error(error);
      return;
    }

    toast.success("Store Created");
    return data;
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

  // useEffect(() => {
  //   walletAddress && console.log(functionsToExport.fetchMyStores());
  // }, [walletAddress]);

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
