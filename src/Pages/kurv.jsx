import React, { useEffect, useState } from "react";
import { SlBasket } from "react-icons/sl";
import { FaCreditCard, FaFileInvoice, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Kurv() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const handleProceedToPayment = () => {
        localStorage.setItem("cart", JSON.stringify(cart));
        navigate("/payment");
    };

    // Delete item from cart
    const handleDelete = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Increase quantity
    const handleIncrease = (id) => {
        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Decrease quantity
    const handleDecrease = (id) => {
        const updatedCart = cart.map(item =>
            item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <div>
            {/* Steps Progress */}
            <div
                className="steps-container flex items-center justify-center mb-8 max-w-xs mx-auto"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "30px",
                    maxWidth: "300px",
                    margin: "19px auto",
                }}
            >
                {/* Step 1: Cart */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                        style={{
                            background: "#495464",
                            color: "white",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                            boxShadow: "0 0 10px rgba(0,0,0,0.53)",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate("/kurv")}
                    >
                        <SlBasket />
                    </div>
                </div>
                <div
                    style={{
                        flex: 1,
                        height: "4px",
                        backgroundColor: "#495464",
                        margin: "0 10px",
                    }}
                ></div>
                {/* Step 2: Payment */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                        style={{
                            background: "#D3D3D3",
                            color: "#808080",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                            boxShadow: "0 0 10px rgba(0,0,0,0.53)",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate("/payment")}
                    >
                        <FaCreditCard />
                    </div>
                </div>
                <div
                    style={{
                        flex: 1,
                        height: "4px",
                        backgroundColor: "#D3D3D3",
                        margin: "0 10px",
                    }}
                ></div>
                {/* Step 3: Invoice */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                        style={{
                            background: "#D3D3D3",
                            color: "#808080",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                            boxShadow: "0 0 10px rgba(0,0,0,0.53)",
                        }}
                    >
                        <FaFileInvoice />
                    </div>
                </div>
            </div>

            {/* Cart Section */}
            <section className="mt-8" style={{ padding: "4em" }}>
                <h2 className="text-2xl font-bold mb-4"> Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="grid gap-4">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-row-reverse items-center justify-between bg-gray-100 p-4 rounded shadow"
                            >
                                {/* Delete Icon */}
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-red-600 hover:text-red-800 ml-4"
                                    title="Remove from cart"
                                >
                                    <FaTrash />
                                </button>
                                {/* Price with Counter */}
                                <div className="flex flex-col items-center w-32">
                                    <div className="font-bold text-center mb-1">
                                        DKK {item.price_dkk * item.quantity}
                                    </div>
                                    <div className="flex items-center gap-2 justify-center">
                                        <button
                                            onClick={() => handleDecrease(item.id)}
                                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            title="Decrease quantity"
                                        >
                                            <FaMinus />
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                            onClick={() => handleIncrease(item.id)}
                                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            title="Increase quantity"
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                </div>
                                {/* Product Name */}
                                <div className="flex-1 text-center font-semibold">
                                    {item.product_name}
                                </div>
                                {/* Product Image */}
                                <div className="w-20 h-20 flex items-center justify-center">
                                    <img
                                        src={item.image_url}
                                        alt={item.product_name}
                                        className="object-contain h-16 w-16 rounded"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Proceed to Payment Button */}
                {cart.length > 0 && (
                    <div className="mt-8" style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button
                            onClick={handleProceedToPayment}
                            style={{ width: "200px" }}
                            className="bg-[#FF6900] text-white font-bold py-2 rounded hover:bg-[#3e4b55]"
                        >
                            Go to Payment
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}