import React, { useEffect, useState, useRef } from "react";
import { FiSliders } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import productImg from "/public/product_1.svg";
import ShopSidebar from "../components/Shopsidebar";
import "../style/shop.scss";

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [animationProduct, setAnimationProduct] = useState(null);
    const basketRef = useRef(null);
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

    const brandToUrl = (brand) => brand?.toLowerCase().trim();
    const categoryToUrl = (category) => category?.toLowerCase().replace(/\s+/g, "-").trim();

    // Filter products by brand and category
    const filteredProducts = !loading
        ? products.filter((p) => {
            const matchesBrand = brand
                ? brandToUrl(p.brand) === brandToUrl(brand)
                : true;
            const matchesCategory = category
                ? categoryToUrl(p.category) === categoryToUrl(category)
                : true;
            return matchesBrand && matchesCategory;
        })
        : [];

    // Handle brand change in the sidebar
    const handleBrandChange = (selectedBrand) => {
        const newUrl = selectedBrand ? `/shop/${selectedBrand.toLowerCase()}${location.search}` : `/shop${location.search}`;
        navigate(newUrl);
    };

    // Handle category change in the sidebar
    const handleCategoryChange = (selectedCategory) => {
        let base = "/shop";
        if (brand) base += `/${brand}`;
        const search = selectedCategory ? `?category=${selectedCategory}` : "";
        navigate(`${base}${search}`);
    };

    // Add product to cart
    const addToCart = (product) => {
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

            alert(`${product.product_name} has been added to the cart.`);
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error("Error saving to cart:", error);
        }
    };

    return (
        <>
            <h1 className="uppercase text-2xl font-bold mb-4">Products</h1>
            <div className="flex justify-between">
                <ShopSidebar
                    selectedBrand={brand}
                    onBrandChange={handleBrandChange}
                    selectedCategory={category}
                    onCategoryChange={handleCategoryChange}
                />
                <section className="w-4/5 p-4 grid grid-cols-3 gap-4">
                    {loading ? (
                        <p>Loading products...</p>
                    ) : filteredProducts.length === 0 ? (
                        <p>
                            No products found
                            {category && ` in category: ${category}`}
                            {brand && ` for brand: ${brand}`}
                        </p>
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
                                    <button
                                        className="product__bttn bg-orange-600 text-white px-4 py-2 rounded shadow hover:bg-orange-700"
                                        onClick={() => addToCart(product)}
                                    >
                                        Add to cart
                                    </button>
                                    <p className="flex items-center">
                                        {product.stock || "In stock"}
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