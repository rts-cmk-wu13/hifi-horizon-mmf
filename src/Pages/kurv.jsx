import React, { useEffect, useState } from "react";
import { SlBasket } from "react-icons/sl";
import { FaCreditCard, FaFileInvoice } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Kurv() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    // Load cart from localStorage on component mount
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const handleProceedToPayment = () => {
        navigate("/payment");
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
            <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="grid gap-4">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between bg-gray-100 p-4 rounded shadow"
                            >
                                <div>
                                    <p className="font-bold">{item.product_name}</p>
                                    <p>DKK {item.price_dkk}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Proceed to Payment Button */}
                {cart.length > 0 && (
                    <div className="mt-8">
                        <button
                            onClick={handleProceedToPayment}
                            className="w-full bg-[#495464] text-white font-bold py-2 rounded hover:bg-[#3e4b55]"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}