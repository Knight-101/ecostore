import React, { useContext, useState } from "react";
import { create } from "ipfs-http-client";
import styles from "../styles/CreateProduct.module.css";
import Web3Context from "../contexts/Web3Context";

const client = create("https://ipfs.infura.io:5001/api/v0");

const CreateProduct = ({ storeId, close }) => {
  const { addProduct, uploadToIpfs } = useContext(Web3Context);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image_url: "",
  });
  const [file, setFile] = useState({});
  const [uploaded, setUploaded] = useState(false);

  async function onChange(e) {
    const files = e.target.files;
    console.log(files);
    try {
      const hash = await uploadToIpfs(files[0]);
      if (true) {
        console.log("uploaded");
        setFile({
          filename: files[0].name,
          hash: typeof hash !== "undefined" ? hash : "hash",
        });
        setUploaded(true);
      }
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  const createProduct = async () => {
    try {
      // Combine product data and file.name
      const product = { ...newProduct, ...file };
      const data = await addProduct(product, storeId);
      data && console.log("Product added");
    } catch (error) {
      console.log(error);
    }
  };

  function openFileDialog() {
    document.getElementById("getFile").click();
  }

  return (
    <div className={styles.background_blur}>
      <div className={styles.create_product_container}>
        <div className={styles.create_product_cross}>
          <button onClick={() => close(false)} className={styles.close}>
            &#x2715;
          </button>
        </div>
        <div className={styles.create_product_form}>
          <header className={styles.header}>
            <h1>Create Product</h1>
          </header>

          <div className={styles.form_container}>
            <input
              type="file"
              accept=".zip,.rar,.7zip,.jpg,.png,.jpeg,.gif,.bmp,.svg,.webp"
              placeholder="Emojis"
              onChange={onChange}
              className={styles.getFile}
              id="getFile"
            />
            <button onClick={openFileDialog} className={styles.file_btn}>
              Add a File
            </button>
            {file.filename != null && (
              <div className={styles.file_name}>{file.filename}</div>
            )}
            <input
              className={styles.input}
              type="text"
              placeholder="Product Name"
              onChange={(e) => {
                setNewProduct({ ...newProduct, name: e.target.value });
              }}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Price"
              onChange={(e) => {
                setNewProduct({ ...newProduct, price: e.target.value });
              }}
            />

            <input
              className={styles.input}
              type="url"
              placeholder="Image URL ex: https://i.imgur.com/rVD8bjt.png"
              onChange={(e) => {
                setNewProduct({ ...newProduct, image_url: e.target.value });
              }}
            />

            <button
              className={styles.button}
              onClick={() => {
                createProduct();
              }}
              disabled={!uploaded}
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
