import React, { useEffect, useContext, useState, useMemo } from "react";
import { Keypair, Connection, clusterApiUrl } from "@solana/web3.js";
import { findReference, FindReferenceError } from "@solana/pay";
import IPFSDownload from "./IpfsDownload";
import Web3Context from "../contexts/Web3Context";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import PaymentModal from "./paymentModal";

const STATUS = {
  Initial: "Initial",
  Submitted: "Submitted",
  Paid: "Paid",
};

export default function Buy({ itemID, price, filename, hash }) {
  const router = useRouter();
  const { id } = router.query;
  const { walletAddress, buyProduct, hasPurchased, buyProductQR, addOrder } =
    useContext(Web3Context);
  const orderID = useMemo(() => Keypair.generate().publicKey, []); // Public key used to identify the order
  const [loading, setLoading] = useState(false); // Loading state of all above
  const [status, setStatus] = useState(STATUS.Initial); // Tracking transaction status
  const [QR, setQR] = useState(null); // Tracking transaction status

  const order =
    id &&
    useMemo(
      () => ({
        orderID: orderID,
        storeID: id,
        price: price,
        itemId: itemID,
      }),
      [orderID, id, itemID]
    );

  // Fetch the transaction object from the server (done to avoid tampering)
  const processTransaction = async (offset) => {
    setLoading(true);
    // Attempt to send the transaction to the network
    try {
      // const qrCode = await buyProductQR(order);
      const txHash = await buyProduct(order, offset);
      // console.log(qrCode);
      // await qrCode.append(document.getElementById("canvas"));
      // setQR(true);
      // setStatus(STATUS.Submitted);
      if (txHash) {
        console.log(
          `Transaction sent: https://solscan.io/tx/${txHash}?cluster=devnet`
        );
        setStatus(STATUS.Submitted);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function checkPurchased() {
      const purchased = await hasPurchased(itemID);
      purchased && setStatus(STATUS.Paid);
    }

    checkPurchased();
  }, [itemID, walletAddress]);

  useEffect(() => {
    // Check if transaction was confirmed
    if (status === STATUS.Submitted) {
      setLoading(true);
      const interval = setInterval(async () => {
        try {
          const connection = new Connection(clusterApiUrl("devnet"));
          const signatureInfo = await findReference(connection, orderID, {
            finality: "confirmed",
          });
          const orderConfirm = await addOrder(order, signatureInfo.signature);
          if (orderConfirm) {
            clearInterval(interval);
            setStatus(STATUS.Paid);
            setLoading(false);
            setQR(false);
          }
        } catch (e) {
          if (e instanceof FindReferenceError) {
            return null;
          }
          console.error("Unknown error", e);
        } finally {
          setLoading(false);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [status]);

  if (!walletAddress) {
    return (
      <div>
        <p>Connect wallet</p>
      </div>
    );
  }

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      {/* <PaymentModal /> */}
      <div id="canvas"></div>
      {status === STATUS.Paid ? (
        <IPFSDownload filename={filename} hash={hash} />
      ) : (
        <button
          disabled={loading}
          className="buy-button"
          onClick={processTransaction}
        >
          Buy now 🠚
        </button>
      )}
    </div>
  );
}
