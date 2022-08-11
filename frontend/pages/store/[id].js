import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CreateProduct from "../../components/CreateProduct";
import Product from "../../components/Product";
import Web3Context from "../../contexts/Web3Context";

const User = () => {
  const { fetchProducts } = useContext(Web3Context);
  const router = useRouter();
  const [products, setProducts] = useState(null);
  const { id } = router.query;

  useEffect(() => {
    const fetchAllProducts = async () => {
      const data = id && (await fetchProducts(id));
      data && setProducts([...data]);
    };
    fetchAllProducts();
  }, [id]);

  // const prod = [
  //   {
  //     id: id,
  //     name: "NFT",
  //     price: "1",
  //     description: "NFT",
  //     image_url: "",
  //   },
  //   {
  //     id: id + 1,
  //     name: "NFT",
  //     price: "1",
  //     description: "NFT",
  //     image_url: "",
  //   },
  //   {
  //     id: id + 2,
  //     name: "NFT",
  //     price: "1",
  //     description: "NFT",
  //     image_url: "",
  //   },
  //   {
  //     id: id + 3,
  //     name: "NFT",
  //     price: "1",
  //     description: "NFT",
  //     image_url: "",
  //   },
  // ];

  return (
    <>
      <div className="store-container">
        {products?.map((item) => (
          <Product key={item.id} product={item} />
        ))}
      </div>
      <CreateProduct storeId={id} />
    </>
  );
};

export default User;
