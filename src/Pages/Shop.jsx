import React, { useEffect, useState } from "react";
import { FiSliders } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import "../style/shop.scss";

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [animationProduct, setAnimationProduct] = useState(null); // State for animation
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
                    console.error("Unknown data format:", data);
                }
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Filter products by brand and category
    const filteredProducts = !loading
        ? products.filter((p) => {
              const matchesBrand = brand ? p.brand?.toLowerCase() === brand.toLowerCase() : true;
              const matchesCategory = category ? p.category?.toLowerCase() === category.toLowerCase() : true;
              return matchesBrand && matchesCategory;
          })
        : [];

    // Handle brand change in the sidebar
    const handleBrandChange = (selectedBrand) => {
        const newUrl = selectedBrand ? `/shop/${selectedBrand.toLowerCase()}${location.search}` : `/shop${location.search}`;
        navigate(newUrl);
    };

    // Example brands for checkboxes
    const brands = ["Steelseries", "Logitech", "Apple"];

    // Add product to cart
    const addToCart = (product, event) => {
        try {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingProduct = cart.find((item) => item.id === product.id);

            if (existingProduct) {
                // If the product already exists in the cart, increase its quantity
                const updatedCart = cart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
                localStorage.setItem("cart", JSON.stringify(updatedCart));
            } else {
                // If the product is not in the cart, add it with a quantity of 1
                const updatedCart = [...cart, { ...product, quantity: 1 }];
                localStorage.setItem("cart", JSON.stringify(updatedCart));
            }

            // Trigger animation
            const rect = event.target.getBoundingClientRect();
            setAnimationProduct({
                id: product.id,
                image: product.image_url,
                startX: rect.left,
                startY: rect.top,
            });

            setTimeout(() => setAnimationProduct(null), 1000); // Clear animation after 1 second
        } catch (error) {
            console.error("Error saving to cart:", error);
        }
    };

    return (
        <>
            <h1 className="uppercase text-2xl font-bold mb-4">Products</h1>
            <div className="flex flex-col md:flex-row">
                <aside className="aside_box w-full md:w-1/5 p-4 bg-gray-100">
                    <h3 className="text-lg font-semibold mb-2">Sort by</h3>
                    <div className="space-y-2">
                        <div className="header__dropdown">
                            <h3>Brand</h3>
                            <h3>
                                <RiArrowDropDownLine className="text-3xl flex justify-end" />
                            </h3>
                        </div>
                        {brands.map((b) => (
                            <div className="flex gap-1 justify-between" key={b}>
                                <label className="flex items-center">{b}</label>
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={brand?.toLowerCase() === b.toLowerCase()}
                                    onChange={() => handleBrandChange(brand?.toLowerCase() === b.toLowerCase() ? null : b)}
                                />
                            </div>
                        ))}
                    </div>
                </aside>

                <section className="products__wrapper w-full md:w-4/5 p-4 grid grid-cols-3 gap-4">
                    {filteredProducts.length === 0 ? (
                        <p>No products found.</p>
                    ) : (
                        filteredProducts.map((product, index) => (
                            <div
                                key={index}
                                className="p-4 rounded shadow flex flex-col items-center"
                            >
                                <h3 className="text-center flex justify-center items-center gap-2">
                                    Compare <FiSliders />
                                </h3>
                                <img src={product.image_url} alt={product.product_name || product.name} className="my-2" />
                                <h3 className="text-center">{product.product_name || product.name}</h3>
                                <p className="font-bold mt-2">{product.price_dkk} DKK</p>
                                <div className="flex items-center justify-between gap-4 mt-2 w-full">
                                    <button
                                        className="product__bttn bg-orange-600 text-white px-4 py-2 rounded shadow hover:bg-orange-700"
                                        onClick={(e) => addToCart(product, e)}
                                    >
                                        Add to cart
                                    </button>
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

            {/* Animation */}
            {animationProduct && (
                <div
                    className="animation-product"
                    style={{
                        position: "fixed",
                        top: animationProduct.startY,
                        left: animationProduct.startX,
                        width: "50px",
                        height: "50px",
                        backgroundImage: `url(${animationProduct.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "50%",
                        animation: "fly-to-basket 1s ease-in-out forwards",
                        zIndex: 1000,
                    }}
                ></div>
            )}
        </>
    );
}
