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
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { toast } from "react-toastify";
import { createQR, encodeURL } from "@solana/pay";
import {
  Program,
  AnchorProvider,
  web3,
  utils,
  BN,
} from "@project-serum/anchor";
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
  "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
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
    const connection = new Connection(
      clusterApiUrl("devnet"),
      opts.preflightCommitment
    );
    const userPublicKey = new PublicKey(walletAddress);
    const userUsdcAddress = await getAssociatedTokenAddress(
      usdcAddress,
      userPublicKey
    );
    const account = await connection.getTokenAccountsByOwner(userPublicKey, {
      mint: usdcAddress,
    });
    if (!account.value.length) {
      toast.error("Token account not initialized");

      return;
    }

    const balance = await connection.getTokenAccountBalance(userUsdcAddress);
    return balance;
  };
  // walletAddress && getUsdcBalance();

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
          toast.success("Wallet Connected");
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        toast.error("Solana object not found! Get a Phantom Wallet");
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
      .select("id,name, description, image")
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
      .select("id,name, description, image")
      .eq("owner", walletAddress)
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    console.log(data);
    return data;
  };

  functionsToExport.offsetTransaction = async () => {
    try {
      toast.info("Buying Offset...");
      const response = await axios.post(
        "https://api.getchange.io/api/v1/climate/crypto_offset",

        {
          funds_collected: false,
          count: 1,
          currency: "sol",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username:
              "pk_test_683b5b5afbbe903e8856557955324dc8a4b7d22045fa499c447e311e6d36421b",
            password:
              "sk_test_bb8535af95170e1bd1a857f625df1cdfbbb1f2f7bb04c747de1201e1ac8eb8d2",
          },
        }
      );

      const offset_amount = response.data.amount;
      console.log(offset_amount);
      const total_donated = await functionsToExport.donate(offset_amount);

      return total_donated;
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
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

  functionsToExport.buyProduct = async (order, offset) => {
    try {
      const { orderID, storeID, price, itemId } = order;
      if (!walletAddress) {
        toast.error("Wallet not connected");
        return;
      }

      if (!orderID) {
        console.log("Missing order ID");
        return;
      }

      if (!price) {
        console.log("Item not found.");
        return;
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

      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

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

      let { error: err } = await supabase.from("orders").insert([
        {
          store_id: storeID,
          buyer: walletAddress,
          order_id: orderID.toString(),
          item_id: itemId,
          amount: price,
          txn_hash: txHash,
        },
      ]);
      if (err) {
        toast.error(err);
        console.error(err);
        return;
      }

      if (offset) {
        await functionsToExport.offsetTransaction();
      }

      toast.success("Product Bought");

      return txHash;
    } catch (err) {
      console.error(err);
    }
  };

  functionsToExport.buyProductQR = async (order) => {
    try {
      const { orderID, storeID, price, itemId } = order;
      if (!walletAddress) {
        toast.error("Wallet not connected");
        return;
      }

      if (!orderID) {
        console.log("Missing order ID");
        return;
      }

      if (!price) {
        console.log("Item not found.");
        return;
      }

      let { data, error } = await supabase
        .from("stores")
        .select("owner,name")
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

      const label = data[0].name;
      const message = `Your order ID - ${orderID.toString()}`;

      const url = encodeURL({
        recipient: buyerPublicKey,
        amount: bigAmount,
        splToken: usdcAddress,
        reference: orderID,
        label,
        message,
      });
      const qrCode = createQR(url);

      return qrCode;
    } catch (err) {
      console.error(err);
    }
  };

  functionsToExport.addOrder = async (order, hash) => {
    try {
      const { orderID, storeID, itemId, price } = order;
      if (!walletAddress) {
        toast.error("Wallet not connected");
        return;
      }

      if (!orderID) {
        console.log("Missing order ID");
        return;
      }

      if (!price) {
        console.log("Item not found.");
        return;
      }

      const res = await functionsToExport.hasPurchased(itemId);

      if (!res) {
        let { error: err } = await supabase.from("orders").insert([
          {
            store_id: storeID,
            buyer: walletAddress,
            order_id: orderID,
            item_id: itemId,
            amount: price,
            txn_hash: hash,
          },
        ]);

        if (err) {
          toast.error(err);
          console.error(err);
          return;
        }
        toast.success("Thankyou for your purchase");
      }

      return true;
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

  functionsToExport.getDonations = async () => {
    try {
      let { data, error } = await supabase
        .from("donations")
        .select("amount,hash")
        .eq("user", walletAddress);

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

  functionsToExport.getOwner = async (id) => {
    try {
      let { data, error } = await supabase
        .from("stores")
        .select("owner")
        .eq("id", parseInt(id));

      if (error) {
        console.error(error);
        return;
      }

      return data[0].owner;
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
  };

  functionsToExport.fetchOrderDetails = async () => {
    try {
      if (!walletAddress) {
        toast.error("Wallet not connected");
        return;
      }
      let orderDetails = [];
      let { data: orders, error } = await supabase
        .from("orders")
        .select("created_at,order_id,store_id,item_id,amount,txn_hash")
        .eq("buyer", walletAddress);

      if (error) {
        toast.error(error);
        console.error(error);
        return;
      }

      for (let i = 0; i < orders?.length; i++) {
        // const timestamp = orders[i].created_at;
        // const orderId = orders[i].order_id;
        const storeId = orders[i].store_id;
        const itemId = orders[i].item_id;
        let { data: store, error: error1 } = await supabase
          .from("stores")
          .select("name")
          .eq("id", storeId);

        let { data: item, error: error2 } = await supabase
          .from("products")
          .select("name,image_url")
          .eq("id", itemId);

        if (error1 || error2) {
          console.error(error1);
          console.error(error2);
          return;
        }
        const orderObject = {
          date: orders[i].created_at,
          image: item[0].image_url,
          orderId: orders[i].order_id,
          storeName: store[0].name,
          productName: item[0].name,
          amount: orders[i].amount,
          hash: orders[i].txn_hash,
        };
        orderDetails.push(orderObject);
      }

      return orderDetails;
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
  };

  functionsToExport.mintCRB = async () => {
    try {
      const NftTitle = "Carbon NFT";
      const NftSymbol = "CRB";
      const NftUri =
        "https://gateway.ipfscdn.io/ipfs/QmZHZUHfL9W65Y8pzkNetiJfQDFtidiCVsYKYtaCUbiPiy";

      const provider = getProvider();
      const wallet = provider.wallet;

      const program = new Program(idl, programID, provider);

      const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
        "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
      );

      // Derive the mint address and the associated token account address

      const mintKeypair = web3.Keypair.generate();
      const tokenAddress = await utils.token.associatedAddress({
        mint: mintKeypair.publicKey,
        owner: wallet.publicKey,
      });
      console.log(`New token: ${mintKeypair.publicKey}`);

      // // Derive the metadata and master edition addresses

      const metadataAddress = (
        await web3.PublicKey.findProgramAddress(
          [
            Buffer.from("metadata"),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mintKeypair.publicKey.toBuffer(),
          ],
          TOKEN_METADATA_PROGRAM_ID
        )
      )[0];
      console.log("Metadata initialized");
      const masterEditionAddress = (
        await web3.PublicKey.findProgramAddress(
          [
            Buffer.from("metadata"),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mintKeypair.publicKey.toBuffer(),
            Buffer.from("edition"),
          ],
          TOKEN_METADATA_PROGRAM_ID
        )
      )[0];
      console.log("Master edition metadata initialized");

      const [nftData] = await PublicKey.findProgramAddress(
        [
          utils.bytes.utf8.encode("MINT_CRB"),
          provider.wallet.publicKey.toBuffer(),
        ],
        program.programId
      );

      // // Transact with the "mint" function in our on-chain program

      await program.methods
        .mint(NftTitle, NftSymbol, NftUri)
        .accounts({
          nftData,
          masterEdition: masterEditionAddress,
          metadata: metadataAddress,
          mint: mintKeypair.publicKey,
          tokenAccount: tokenAddress,
          mintAuthority: wallet.publicKey,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        })
        .signers([mintKeypair])
        .rpc();
      toast.success("NFT Minted!!");
      const nftAccount = await program.account.nftData.fetch(nftData);

      return nftAccount;
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
  };

  functionsToExport.upgradeNFT = async (newUri) => {
    try {
      const NftTitle = "Carbon NFT";
      const NftSymbol = "CRB";

      const provider = getProvider();
      const wallet = provider.wallet;

      const program = new Program(idl, programID, provider);

      const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
        "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
      );

      const [nftData] = await PublicKey.findProgramAddress(
        [
          utils.bytes.utf8.encode("MINT_CRB"),
          provider.wallet.publicKey.toBuffer(),
        ],
        program.programId
      );

      const nftAccount = await program.account.nftData.fetch(nftData);
      // console.log(nftAccount.donated.toNumber());

      const foundMetadataAddress = (
        await web3.PublicKey.findProgramAddress(
          [
            Buffer.from("metadata"),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            nftAccount.mintAddress.toBuffer(),
          ],
          TOKEN_METADATA_PROGRAM_ID
        )
      )[0];

      const tx = await program.methods
        .updateMetadata(NftTitle, NftSymbol, newUri)
        .accounts({
          nftData,
          metadata: foundMetadataAddress,
          updateAuthority: wallet.publicKey,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        })
        .rpc();

      tx && toast.success("NFT upgraded!");

      return tx;
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
  };

  functionsToExport.getNftDetails = async () => {
    try {
      const provider = getProvider();
      const wallet = provider.wallet;

      const program = new Program(idl, programID, provider);

      const [nftData] = await PublicKey.findProgramAddress(
        [
          utils.bytes.utf8.encode("MINT_CRB"),
          provider.wallet.publicKey.toBuffer(),
        ],
        program.programId
      );
      //check if nft account minted
      const isNFT = await program.account.nftData.getAccountInfo(nftData);

      const nftDetails =
        isNFT && (await program.account.nftData.fetch(nftData));

      return nftDetails;
    } catch (err) {
      console.error(err);
    }
  };

  functionsToExport.donate = async (amount) => {
    try {
      const nft = functionsToExport.getNftDetails();
      if (!nft) {
        toast.error("NFT not minted!");
      }
      const provider = getProvider();
      const wallet = provider.wallet;

      const program = new Program(idl, programID, provider);

      const [nftData] = await PublicKey.findProgramAddress(
        [
          utils.bytes.utf8.encode("MINT_CRB"),
          provider.wallet.publicKey.toBuffer(),
        ],
        program.programId
      );

      const receiverPublicKey = new PublicKey(
        "6WzFCFukTTbwVZnRpkRGtX1GWbpCfc9AVQVeSkgVG8cz"
      );
      const senderPublicKey = wallet.publicKey;
      const senderUsdcAddress = await getAssociatedTokenAddress(
        usdcAddress,
        senderPublicKey
      );

      const recipientUsdcAddress = await getAssociatedTokenAddress(
        usdcAddress,
        receiverPublicKey
      );

      // This is new, we're getting the mint address of the token we want to transfer
      const usdcMint = await getMint(provider.connection, usdcAddress);

      const tx = await program.rpc.donate(
        new BN(amount * 10 ** usdcMint.decimals),
        {
          accounts: {
            nftData,
            sender: wallet.publicKey,
            senderTokens: senderUsdcAddress,
            recipientTokens: recipientUsdcAddress,
            tokenProgram: TOKEN_PROGRAM_ID,
          },
        }
      );
      let { data, error } = await supabase.from("donations").insert([
        {
          user: walletAddress,
          amount: amount.toString(),
          hash: tx,
        },
      ]);
      if (error) {
        console.error(error);
        return;
      }

      toast.success("Thankyou for your donation");
      const nftAccount = await program.account.nftData.fetch(nftData);

      return nftAccount.donated.toNumber();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };

    onLoad();
  }, []);
  // walletAddress && getUsdcBalance().then((res) => console.log(res));
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
