import React, { useEffect, useState } from "react";
import { FiSliders } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { Link, useParams, useNavigate } from "react-router";
import productImg from "/public/product_1.svg";
import ShopSidebar from "../components/ShopSidebar";
import "../style/shop.scss";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { brand } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setProducts(data.results);
        } else if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Ukendt dataformat:", data);
        }
      })
      .catch((error) => {
        console.error("Fejl ved hentning:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleBrandChange = (selectedBrand) => {
    if (selectedBrand?.toLowerCase() === brand?.toLowerCase()) return;
    navigate(selectedBrand ? `/shop/${selectedBrand.toLowerCase()}` : "/shop");
  };

  const filteredProducts = !loading
    ? brand
      ? products.filter(
          (p) =>
            p.brand?.toLowerCase() === brand.toLowerCase()
        )
      : products
    : [];

  return (
    <>
      <h1 className="uppercase text-2xl font-bold mb-4">Products</h1>
      <div className="flex justify-between">
        <ShopSidebar
          selectedBrand={brand?.toLowerCase()}
          onBrandChange={handleBrandChange}
        />
        <section className="w-4/5 p-4 grid grid-cols-3 gap-4">
          {loading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p>No products found for brand: {brand}</p>
          ) : (
            filteredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded shadow flex flex-col items-center justify-between"
              >
                <h3 className="mr-2 flex">
                  Compare <FiSliders />
                </h3>
                <Link to={`/shop/product/${product.id}`}>
                  <img
                    src={product.image_url || productImg}
                    alt={product.product_name}
                    className="my-2"
                  />
                </Link>
                <h3 className="text-center">{product.product_name}</h3>
                <p className="font-bold mt-2">{product.price_dkk} DKK</p>
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
            ))
          )}
        </section>
      </div>
    </>
  );
}
