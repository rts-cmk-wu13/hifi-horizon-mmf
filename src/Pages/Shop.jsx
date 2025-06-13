import { FiSliders } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router";
import productImg from "/public/product_1.svg";
import { RiArrowDropDownLine } from "react-icons/ri";
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
      stock: "Few in stock",
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
  ];

  return (
    <>
      <h1 className="uppercase text-2xl font-bold mb-4">Products</h1>
      <div className="flex">
        <aside className="w-1/5 p-4 bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">Sort by</h3>
          <div className="space-y-2">
            <div className="header__dropdown ">
              <h3>Brand</h3>
              <h3>
                <RiArrowDropDownLine className="text-3xl flex justify-end" />
              </h3>
            </div>
            <div className="flex gap-1 justify-between">
              <label className="flex items-center">Steelseries</label>
              <input type="checkbox" className="mr-2" />
            </div>
            <div className="flex gap-1 justify-between">
              <label className="flex items-center ">Logitech</label>
              <input type="checkbox" className="mr-2 checked:text-green-600" />
            </div>
            <div className="flex gap-1 justify-between">
              <label className="flex items-center">Apple</label>
              <input type="checkbox" className="mr-2" />
            </div>
            {/*  <div className="mt-4">
              <h4 className="text-md font-semibold mb-1">Color</h4>
              <details className="w-full p-2 border rounded">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> White
                </label>
              </details>
            </div> */}
            {/* <div className="mt-4">
              <h4 className="text-md font-semibold mb-1">Price</h4>
              <input type="range" className="w-full" />
            </div> */}
          </div>
        </aside>

        <section className="w-4/5 p-4 grid grid-cols-3 gap-4">
          {products.map((product, index) => (
            <div
              key={index}
              className=" p-4 rounded shadow flex flex-col items-center"
            >
              <h3 className="text-center flex justify-center items-center gap-2">
                Compare <FiSliders />
              </h3>
              <img src={productImg} alt={product.name} className="my-2" />
              <h3 className="text-center">{product.name}</h3>
              <p className="font-bold mt-2">{product.price}</p>
              <div className="flex items-center gap-4 mt-2">
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
