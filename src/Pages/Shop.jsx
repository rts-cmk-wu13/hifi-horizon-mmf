import { FiSliders } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router";
import productImg from "/public/product_1.svg";
import ShopSidebar from "../components/Shopsidebar";
import Shopdetails from "./Details";
import "../style/shop.scss";

export default function Shop() {
  const products = [
    {
      name: "Auralic Aries G2.1 Streamer (Digital Output)",
      price: "£4,799.00",
      stock: "In stock",
    },
    {
      name: "Auralic Aries G2.1 Streamer (Digital Output)",
      price: "£4,799.00",
      stock: "In stock",
    },
    {
      name: "Auralic Aries G2.1 Streamer (Digital Output)",
      price: "£4,799.00",
      stock: "In stock",
    },
    {
      name: "Auralic Aries G2.1 Streamer (Digital Output)",
      price: "£4,799.00",
      stock: "In stock",
    },
    {
      name: "Auralic Aries G2.1 Streamer (Digital Output)",
      price: "£4,799.00",
      stock: "Out of stock",
    },
    {
      name: "Auralic Aries G2.1 Streamer (Digital Output)",
      price: "£4,799.00",
      stock: "In stock",
    },
    {
      name: "Auralic Aries G2.1 Streamer (Digital Output)",
      price: "£4,799.00",
      stock: "In stock",
    },
    {
      name: "Auralic Aries G2.1 Streamer (Digital Output)",
      price: "£4,799.00",
      stock: "Few in stock",
    },
    {
      name: "Auralic Aries G2.1 Streamer (Digital Output)",
      price: "£4,799.00",
      stock: "In stock",
    },
  ];

  return (
    <>
      <h1 className="uppercase text-2xl font-bold mb-4">Products</h1>
      <div className="flex justify-between">
        <ShopSidebar />
        <section className="w-4/5 p-4 grid grid-cols-3 gap-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="p-4 rounded shadow flex flex-col items-center justify-between"
            >
              <h3 className="mr-2 flex">
                Compare <FiSliders />
              </h3>
              <Link to={`./${index}`}>
                <img src={productImg} alt={product.name} className="my-2" />
              </Link>
              <h3 className="text-center">{product.name}</h3>
              <p className="font-bold mt-2">{product.price}</p>
              <div className="flex items-center justify-between gap-4 mt-2 w-full">
                <Link to="#">
                  <button className="product__bttn bg-orange-600 text-white px-4 py-2 rounded shadow">
                    Add to cart
                  </button>
                </Link>
                <p className="flex items-center">
                  {product.stock}
                  <span
                    className={`ml-1 text-xl ${
                      product.stock === "Out of stock"
                        ? "text-red-600"
                        : product.stock === "Few in stock"
                        ? "text-orange-500"
                        : "text-green-600"
                    }`}
                  >
                    <GoDotFill />
                  </span>
                </p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
