import React, { useEffect, useState } from "react";
import { FiSliders } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { Link, useParams, useNavigate, useLocation } from "react-router";
import productImg from "/public/product_1.svg";
import ShopSidebar from "../components/ShopSidebar";
import "../style/shop.scss";

export default function Shop() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const { brand } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Get category from query string (e.g. ?category=cd-afspillere)
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  // Fetch all products
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

  // Filtrering på brand + category
  const filteredProducts = !loading
    ? products.filter((p) => {
        const matchesBrand = brand ? p.brand?.toLowerCase() === brand.toLowerCase() : true;
        const matchesCategory = category ? p.category?.toLowerCase() === category.toLowerCase() : true;
        return matchesBrand && matchesCategory;
      })
    : [];

  // Når der skiftes brand i sidebar
  const handleBrandChange = (selectedBrand) => {
    const newUrl = selectedBrand ? `/shop/${selectedBrand.toLowerCase()}${location.search}` : `/shop${location.search}`;
    navigate(newUrl);
  };

  return (
    <>
      <h1 className="uppercase text-2xl font-bold mb-4">Products</h1>
<<<<<<< HEAD
      <div className="flex flex-col md:flex-row">
        <aside className="aside_box w-full md:w-1/5 p-4 bg-gray-100">
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

        <section className="products__wrapper w-full md:w-4/5 p-4 grid grid-cols-3 gap-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="p-4 rounded shadow flex flex-col items-center"
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
=======
      <div className="flex justify-between">
        <ShopSidebar
          selectedBrand={brand?.toLowerCase()}
          onBrandChange={handleBrandChange}
        />
        <section className="w-4/5 p-4 grid grid-cols-3 gap-4">

          {loading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p>No products found for category: {category}, brand: {brand}</p>
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

>>>>>>> 4cc1209d1c7acfe3407f646b90861a0e4df3410a
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
