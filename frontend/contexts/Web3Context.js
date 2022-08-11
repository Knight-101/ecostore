import { createContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Transaction,
  sendAndConfirmTransaction,
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

const usdcAddress = new PublicKey(
  "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"
);

export const Web3Provider = (props) => {
  const [walletAddress, setWalletAddress] = useState(null);

  const functionsToExport = {};

  const getProvider = () => {
    const connection = new Connection(
      clusterApiUrl("devnet"),
      opts.preflightCommitment
    );
    const provider = new AnchorProvider(
      connection,
      window.solana,
      opts.preflightCommitment
    );

    return provider;
  };

  const getUsdcBalance = async (address) => {
    const userPublicKey = new PublicKey(walletAddress);
    const userUsdcAddress = await getAssociatedTokenAddress(
      usdcAddress,
      userPublicKey
    );
    const connection = new Connection(
      clusterApiUrl("devnet"),
      opts.preflightCommitment
    );
    const balance = await connection.getTokenAccountBalance(userUsdcAddress);
    return balance;
  };
  walletAddress && getUsdcBalance();

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

  functionsToExport.fetchProducts = async (id) => {
    try {
      let { data, error } = await supabase
        .from("products")
        .select("id,name, price, image_url, filename, hash")
        .eq("store_id", id);

      if (error) {
        toast.error(error);
        console.error(error);
        return;
      }

      return data;
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
  };
  functionsToExport.addProduct = async (product, storeId) => {
    try {
      const { name, price, image_url, filename, hash } = product;
      let { data, error } = await supabase.from("products").insert([
        {
          store_id: storeId,
          name: name,
          price: price,
          image_url: image_url,
          filename: filename,
          hash: hash,
        },
      ]);
      if (error) {
        toast.error(error);
        console.error(error);
        return;
      }

      toast.success("New Product Added");
      return data;
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
  };

  functionsToExport.uploadToIpfs = async (file) => {
    try {
      var data = new FormData();
      data.append("file", file);
      data.append("pinataOptions", '{"cidVersion": 1}');
      data.append(
        "pinataMetadata",
        '{"name": "Product", "keyvalues": {"company": "Pinata"}}'
      );

      var config = {
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT_KEY}`,
        },
        data: data,
      };

      const res = await axios(config);
      return res.data.IpfsHash;
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
  };

  functionsToExport.buyProduct = async (order) => {
    try {
      const { orderID, storeID, price, itemId } = order;
      if (!walletAddress) {
        toast.error("Wallet not connected");
      }

      if (!orderID) {
        console.log("Missing order ID");
      }

      if (!price) {
        console.log("Item not found.");
      }

      let { data, error } = await supabase
        .from("stores")
        .select("owner")
        .eq("id", parseInt(storeID));

      if (error) {
        console.error(error);
        return;
      }

      const buyerTokenBalance = await getUsdcBalance();

      if (
        parseFloat(buyerTokenBalance.value.amount) <
        parseFloat(price) * 10 ** buyerTokenBalance.value.decimals
      ) {
        toast.error("Insufficient token balance!!");
        return;
      }

      const sellerAddress = data[0].owner;

      const bigAmount = BigNumber(price);

      const sellerPublicKey = new PublicKey(sellerAddress);
      const buyerPublicKey = new PublicKey(walletAddress);

      const endpoint = clusterApiUrl("devnet");
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
      const provider = getProvider();

      const txHash = await provider.sendAndConfirm(tx);

      await supabase.from("orders").insert([
        {
          store_id: storeID,
          buyer: walletAddress,
          order_id: orderID,
          item_id: itemId,
          amount: price,
          txn_hash: txHash,
        },
      ]);
      if (error) {
        toast.error(error);
        console.error(error);
        return;
      }

      toast.success("Product Bought");

      return txHash;
    } catch (err) {
      console.error(err);
    }
  };
  functionsToExport.hasPurchased = async (itemId) => {
    try {
      let { data, error } = await supabase
        .from("orders")
        .select("id")
        .eq("item_id", itemId)
        .eq("buyer", walletAddress);

      if (error) {
        toast.error(error);
        console.error(error);
        return;
      }

      return data.length ? true : false;
    } catch (err) {
      toast.error(err);
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
