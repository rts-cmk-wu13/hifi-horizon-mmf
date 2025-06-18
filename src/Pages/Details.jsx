import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Chatbot from "../components/Chatbot";
import "../style/detail.css";

export default function Shopdetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Fejl ved hentning af produkt:", error);
      });
  }, [id]);

  if (!product) return <p>Indlæser produkt...</p>;

  return (
    <>
      <Chatbot />
      <h1 className="text-4xl font-bold mb-8 text-gray-700">
        {product.product_name}
      </h1>
      <section className="flex flex-col md:flex-row gap-10 bg-gray-50 p-8 rounded-lg shadow-md detail__wrapper">
        <div className="flex-1 flex flex-col items-center">
          <img
            src={product.image_url}
            alt={product.product_name}
            className="rounded-lg object-contain w-80max-w-md "
          />
        </div>
        <div className="flex-1">
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-2">{product.price_dkk} DKK</p>
          <p
            className={`mb-4 ${
              product.stock === "Out of stock"
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {product.stock}
          </p>
          <div className="flex items-center gap-4 mb-6 justify-evenly">
            <button className="text-black text-3xl">-</button>
            <span className="text-lg">1</span>
            <button className="text-black text-3xl">+</button>
            <button className="cart__bttn">Add to cart</button>
          </div>
        </div>
      </section>
    </>
  );
}
