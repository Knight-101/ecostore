import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CreateProduct from "../../components/CreateProduct";
import Product from "../../components/Product";
import { AddYourStore } from "../../components/yourStores";
import Web3Context from "../../contexts/Web3Context";
import styles from "../../styles/CreateProduct.module.css";

export const AddYourProduct = ({ setIsOpen }) => {
  return (
    <div className={styles.add_prod_wrap}>
      <div className={styles.add_product_main} onClick={() => setIsOpen(true)}>
        <span>&#43;</span>
        Add New Product
      </div>
    </div>
  );
};

const User = () => {
  const { fetchProducts } = useContext(Web3Context);
  const router = useRouter();
  const [products, setProducts] = useState(null);
  const [isOwner, setOwner] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = router.query;

  useEffect(() => {
    const fetchAllProducts = async () => {
      const data = id && (await fetchProducts(id));
      data && setProducts([...data]);
    };
    fetchAllProducts();
  }, [id]);

  const prod = [
    {
      id: id,
      name: "NFT 1",
      price: "1",
      description: "NFT",
      image_url: "",
    },
    {
      id: id + 1,
      name: "NFT 2",
      price: "2",
      description: "NFT",
      image_url: "",
    },
    {
      id: id + 2,
      name: "NFT 3",
      price: "3",
      description: "NFT",
      image_url: "",
    },
    {
      id: id + 3,
      name: "NFT 4",
      price: "4",
      description: "NFT",
      image_url: "",
    },
  ];

  return (
    <>
      <div className="store-container">
        <AddYourProduct setIsOpen={setIsOpen} />
        {isOwner && isOpen && <CreateProduct storeId={id} close={setIsOpen} />}
        {prod.map((item) => (
          <Product Itemkey={item.id} product={item} />
        ))}
      </div>
    </>
  );
};

export default User;
