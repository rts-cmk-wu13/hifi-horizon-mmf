import React, { useEffect, useState } from "react";
import { SlBasket } from "react-icons/sl";
import { FaCreditCard, FaFileInvoice } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Payment() {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentDetails, setPaymentDetails] = useState({
        fullName: "",
        address: "",
        email: "",
        phone: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    const navigate = useNavigate(); // React Router's navigation hook

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);

        // Calculate total price
        const total = storedCart.reduce(
            (sum, item) => sum + item.price_dkk * item.quantity,
            0
        );
        setTotalPrice(total);
    }, []);

    // Handle input changes for payment details
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Handle payment submission
    const handlePayment = (e) => {
        e.preventDefault();

        // Basic validation
        if (
            !paymentDetails.fullName ||
            !paymentDetails.address ||
            !paymentDetails.email ||
            !paymentDetails.phone ||
            !paymentDetails.cardNumber ||
            !paymentDetails.expiry ||
            !paymentDetails.cvv
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        // Save payment details to localStorage for the Invoice page
        localStorage.setItem("paymentDetails", JSON.stringify(paymentDetails));

        // Simulate payment processing
        alert("Payment successful! Thank you for your purchase.");
        localStorage.removeItem("cart"); // Clear the cart after payment
        setCart([]);
        setTotalPrice(0);

        // Navigate to the Invoice page
        navigate("/invoice");
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            {/* Steps Progress */}
            <div
                className="steps-container flex items-center justify-center mb-8 max-w-xs mx-auto"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "30px",
                    maxWidth: "300px", // Adjust the width to make it narrower
                    margin: "19px auto", // Center the progress bar
                }}
            >
                {/* Step 1: Cart */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                        style={{
                            backgroundColor: "#495464",
                            color: "white",
                            boxShadow: "0 0 10px rgba(0,0,0,0.53)", // Updated box shadow
                            width: "50px",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
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
                        height: "6px", // Thicker line
                        backgroundColor: "#495464",
                        margin: "0 15px",
                    }}
                ></div>

                {/* Step 2: Payment */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                        style={{
                            backgroundColor: "#495464",
                            color: "white",
                            boxShadow: "0 0 10px rgba(0,0,0,0.53)", // Updated box shadow
                            width: "50px",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                        }}
                    >
                        <FaCreditCard />
                    </div>
                </div>
                <div
                    style={{
                        flex: 1,
                        height: "6px", // Thicker line
                        backgroundColor: "#D3D3D3",
                        margin: "0 15px",
                    }}
                ></div>

                {/* Step 3: Invoice */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                        style={{
                            backgroundColor: "#D3D3D3",
                            color: "#808080",
                            boxShadow: "0 0 10px rgba(0,0,0,0.53)", // Updated box shadow
                            width: "50px",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                        }}
                    >
                        <FaFileInvoice />
                    </div>
                </div>
            </div>

            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
                Payment
            </h1>

            {/* Cart Summary */}
            <section style={{ marginBottom: "30px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>
                    Your Cart
                </h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "15px",
                                    padding: "10px",
                                    backgroundColor: "#F9F9F9",
                                    borderRadius: "5px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <div>
                                    <p style={{ fontWeight: "bold" }}>{item.product_name}</p>
                                    <p>
                                        DKK {item.price_dkk} x {item.quantity}
                                    </p>
                                </div>
                                <p style={{ fontWeight: "bold" }}>
                                    DKK {item.price_dkk * item.quantity}
                                </p>
                            </div>
                        ))}
                        <div
                            style={{
                                marginTop: "20px",
                                fontWeight: "bold",
                                fontSize: "18px",
                                textAlign: "right",
                            }}
                        >
                            Total: DKK {totalPrice}
                        </div>
                    </div>
                )}
            </section>

            {/* Payment Form */}
            <section>
                <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>
                    Payment Details
                </h2>
                <form onSubmit={handlePayment} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div>
                        <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
                            Full Name *
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={paymentDetails.fullName}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #D3D3D3",
                                borderRadius: "5px",
                            }}
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
                            Address *
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={paymentDetails.address}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #D3D3D3",
                                borderRadius: "5px",
                            }}
                            placeholder="123 Main St, City, Country"
                        />
                    </div>
                    <div>
                        <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={paymentDetails.email}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #D3D3D3",
                                borderRadius: "5px",
                            }}
                            placeholder="example@example.com"
                        />
                    </div>
                    <div>
                        <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
                            Phone No. *
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={paymentDetails.phone}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #D3D3D3",
                                borderRadius: "5px",
                            }}
                            placeholder="+1234567890"
                        />
                    </div>
                    <div>
                        <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
                            Card Number *
                        </label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={paymentDetails.cardNumber}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #D3D3D3",
                                borderRadius: "5px",
                            }}
                            placeholder="1234 5678 9012 3456"
                        />
                    </div>
                    <div style={{ display: "flex", gap: "15px" }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
                                Expiry Date *
                            </label>
                            <input
                                type="text"
                                name="expiry"
                                value={paymentDetails.expiry}
                                onChange={handleInputChange}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid #D3D3D3",
                                    borderRadius: "5px",
                                }}
                                placeholder="MM/YY"
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
                                CVV *
                            </label>
                            <input
                                type="text"
                                name="cvv"
                                value={paymentDetails.cvv}
                                onChange={handleInputChange}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid #D3D3D3",
                                    borderRadius: "5px",
                                }}
                                placeholder="123"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            backgroundColor: "#495464",
                            color: "white",
                            fontWeight: "bold",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        Check Out
                    </button>
                </form>
            </section>
        </div>
    );
}