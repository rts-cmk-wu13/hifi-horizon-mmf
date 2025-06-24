import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "../style/detail.css";
import black from "/icons/black.svg";
import Silver from "/icons/silver.svg";
import Gold from "/icons/gold.svg";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom"; // Add this import

export default function Shopdetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Add quantity state
  const navigate = useNavigate(); // For optional navigation or feedback

  useEffect(() => {
    fetch(`https://hifi-api-cpmk.onrender.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Fejl ved hentning af produkt:", error);
      });
  }, [id]);

  if (!product) return <p>Indlæser produkt...</p>;

  // Add to cart handler
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      // Update quantity if already in cart
      cart[existingIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.push({
        id: product.id,
        product_name: product.product_name,
        price_dkk: product.price_dkk,
        image_url: product.image_url,
        quantity: quantity,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated")); // For header badge update
    alert("Product added to cart!");
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-gray-700">
        {product.product_name}
      </h1>
      <section className="flex flex-col md:flex-row gap-10 bg-[#F4F4F2] p-8 rounded-lg shadow-md detail__wrapper">
        <div className="flex-1 flex flex-col items-center">
          <img
            src={product.image_url}
            alt={product.product_name}
            className="rounded-lg object-contain w-80max-w-md w-[337px] h-[182px] "
          />
        </div>
        <div className="flex-1">
          <p className="text-gray-700 mb-4">{product.description}</p>

          <p
            className={`mb-4 ${
              product.stock && product.stock.toLowerCase() === "out of stock"
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {product.stock || "Ukendt lagerstatus"}
          </p>
          <div className="color_container mb-10 mt-11 ">
            <div className="flex gap-2">
              <button className="">
                <img src={black} alt="Black" />
              </button>
              <button className="">
                <img src={Silver} alt="Silver" />
              </button>
              <button className="">
                <img src={Gold} alt="gold" />
              </button>
            </div>
            <div className="flex gap-2 text-xs text-gray-500 ">
              <span>Black</span>
              <span>Silver</span>
              <span>Gold</span>
            </div>
          </div>
          <p className="text-2xl font-bold mb-2 flex justify-between mb-6">
            {product.price_dkk} DKK{" "}
            <span className="stock flex items-center mr-3 ">
              {" "}
              in stock <GoDotFill className="text-green-600" />{" "}
            </span>
          </p>
          <div className="flex items-center gap-4 mb-6 justify-evenly ">
            <button
              className="text-black text-3xl"
              onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
            >
              -
            </button>
            <span className="text-lg">{quantity}</span>
            <button
              className="text-black text-3xl"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
            <button className="cart__bttn" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </section>
      <hr />

      <section className="specs mt-8">
        <h1 className="mb-4">PRODUCT SPECIFICATIONS</h1>
        <div className="specs__wrapper mb-8 ">
          {product.product_specifications ? (
            <article className="bg_controller ">
              {Object.entries(product.product_specifications).map(
                ([key, value]) => (
                  <div className="flex justify-evenly" key={key}>
                    <strong>
                      {key
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                      :
                    </strong>{" "}
                    {Array.isArray(value)
                      ? value.join(", ")
                      : typeof value === "boolean"
                      ? value
                        ? "Yes"
                        : "No"
                      : value}
                  </div>
                )
              )}
            </article>
          ) : (
            <p>Ingen specifikationer tilgængelige.</p>
          )}
        </div>
      </section>
    </>
  );
}
