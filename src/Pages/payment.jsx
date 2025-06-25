import React, { useEffect, useState } from "react";
import { SlBasket } from "react-icons/sl";
import { FaCreditCard, FaFileInvoice, FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcApplePay } from "react-icons/fa";
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

    // New state for delivery and payment method
    const [deliveryMethod, setDeliveryMethod] = useState("Home delivery");
    const [paymentMethod, setPaymentMethod] = useState("credit");
    const [selectedPostoffice, setSelectedPostoffice] = useState("");

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

    // Handle payment (Check Out)
    const handlePayment = (e) => {
        e.preventDefault();
        // Save all info to localStorage
        localStorage.setItem("paymentDetails", JSON.stringify(paymentDetails));
        localStorage.setItem("deliveryMethod", deliveryMethod);
        localStorage.setItem("paymentMethod", paymentMethod);
        localStorage.setItem("selectedPostoffice", selectedPostoffice);
        // Navigate to invoice
        navigate("/invoice");
    };

    // Add these calculations before the return:
    const deliveryPrice = 4.0;
    const subtotal = cart.reduce((sum, item) => sum + item.price_dkk * item.quantity, 0);
    const vat = (subtotal * 0.25).toFixed(2); // 25% VAT
    const total = (subtotal + deliveryPrice).toFixed(2);

    const postoffices = [
        "Postoffice - 4 Leah Close, Edinburgh, United Kingdom",
        "Postoffice - 7 The Old School House, Edinburgh, United Kingdom",
        "Postoffice - 28 Thwaites Oak Close, Edinburgh, United Kingdom"
    ];

    const postofficeMaps = {
        "Postoffice - 4 Leah Close, Edinburgh, United Kingdom":
          "https://www.google.com/maps?q=4+Leah+Close,+Edinburgh,+United+Kingdom&output=embed",
        "Postoffice - 7 The Old School House, Edinburgh, United Kingdom":
          "https://www.google.com/maps?q=The+Old+School+House,+Edinburgh,+United+Kingdom&output=embed",
        "Postoffice - 28 Thwaites Oak Close, Edinburgh, United Kingdom":
          "https://www.google.com/maps?q=28+Thwaites+Oak+Close,+Edinburgh,+United+Kingdom&output=embed",
      };

    return (
        <div
            style={{
                padding: "20px",
                fontFamily: "Arial, sans-serif",
                boxSizing: "border-box",
                minHeight: "100vh",
                background: "#f7f7f7",
            }}
        >
            {/* Steps Progress */}
            <div
                className="steps-container"
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
                Your info
            </h1>
   <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>
                        Payment Details
                    </h2>
            <div
                className="payment-main-row"
                style={{
                    display: "flex",
                    gap: "40px",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                }}
            >
                {/* Payment Form */}
                <section style={{ flex: 2, minWidth: "260px", width: "100%" }}>
                 
                    <form
                        onSubmit={handlePayment}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "15px",
                            background: "#fff",
                            borderRadius: "10px",
                            boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                            padding: "32px",
                            margin: "0 auto",
                            minWidth: "220px",
                        }}
                    >
                        <div>
                            <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
                                Full Name *
                            </label>
                            <input
                                placeholder="John Doe"
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
                            />
                        </div>
                        <div>
                            <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
                                Address *
                            </label>
                            <input
                                placeholder="123 Main St, City, Country"
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
                            />
                        </div>
                        <div>
                            <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
                                Email *
                            </label>
                            <input
                                placeholder="example@example.com"
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
                            />
                        </div>
                        <div>
                            <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
                                Phone No. *
                            </label>
                            <input
                                placeholder="+1234567890"
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
                            />
                        </div>
                        {/* Check Out button INSIDE the form */}
                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                backgroundColor: "#495464",
                                color: "white",
                                fontWeight: "bold",
                                padding: "14px",
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "18px",
                                marginTop: "20px"
                            }}
                        >
                            Check Out
                        </button>
                    </form>
                </section>

                {/* Info Box */}
                <aside
                    style={{
                        flex: 1,
                        background: "#f9f9f9",
                        borderRadius: "10px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                        padding: "24px",
                        minWidth: "220px",
                        maxWidth: "350px",
                        width: "100%",
                        marginTop: "24px",
                    }}
                >
                    <h3 style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "16px" }}>
                        Order Summary
                    </h3>
                    <div style={{ marginBottom: "16px" }}>
                        {cart.map((item) => (
                            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                <span>
                                    {item.product_name}
                                    {item.quantity > 1 && <span style={{ color: "#888" }}> x{item.quantity}</span>}
                                </span>
                                <span>
                                    DKK {(item.price_dkk * item.quantity).toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                    <hr style={{ margin: "12px 0" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span>Subtotal</span>
                        <span>DKK {subtotal.toLocaleString()}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span>Delivery</span>
                        <span>DKK {deliveryPrice.toFixed(2)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span>VAT (25%)</span>
                        <span>DKK {vat}</span>
                    </div>
                    <hr style={{ margin: "12px 0" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "18px" }}>
                        <span>Total</span>
                        <span>DKK {total}</span>
                    </div>
                </aside>
            </div>

            {/* New forms below the old forms */}
            <div
                className="payment-bottom-row"
                style={{
                    display: "flex",
                    gap: "40px",
                    alignItems: "flex-start",
                    marginTop: "32px",
                    flexWrap: "wrap",
                }}
            >
                {/* Delivery Method Buttons */}
                <div
                    style={{
                        background: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                        padding: "24px",
                        minWidth: "220px",
                        flex: 1,
                        width: "100%",
                        marginBottom: "24px",
                    }}
                >
                    <label style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "10px", display: "block" }}>
                        Select your preferred delivery method
                    </label>
                    <div style={{ display: "flex", gap: "16px", marginBottom: "16px", flexDirection: "column" }}>
                        {["Home delivery", "Click-and-collect", "Postoffice"].map((method) => (
                            <button
                                key={method}
                                type="button"
                                onClick={() => setDeliveryMethod(method)}
                                style={{
                                    padding: "10px 16px",
                                    borderRadius: "6px",
                                    border: deliveryMethod === method ? "2px solid #495464" : "1px solid #D3D3D3",
                                    background: deliveryMethod === method ? "#495464" : "#fff",
                                    color: deliveryMethod === method ? "#fff" : "#495464",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                }}
                            >
                                {method}
                            </button>
                        ))}
                    </div>
                    {/* Conditional address/info */}
                    {deliveryMethod === "Home delivery" && (
                        <div style={{ marginTop: "10px", color: "#495464", fontSize: "15px" }}>
                            <div style={{ fontWeight: "bold" }}>Your order will be shipped to</div>
                            <div>61 Church St</div>
                            <div>Berwick-upon-Tweed</div>
                            <div>Northumberland</div>
                            <div>TD15 1EE</div>
                            <div>United Kingdom</div>
                        </div>
                    )}
                    {deliveryMethod === "Click-and-collect" && (
                        <div style={{ marginTop: "10px", color: "#495464", fontSize: "15px" }}>
                            <div style={{ fontWeight: "bold" }}>Your order will be shipped to</div>
                            <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                                <div style={{ fontWeight: "bold" }}>Edinburgh</div>
                                <div>2 Joppa Rd, Edinburgh, EH15 2EU</div>
                                <div>Monday to Friday: 10:00am - 5:30pm</div>
                                <div>Saturday: 10:00am - 5:30pm</div>
                                <div>Sunday: Closed</div>
                            </div>
                            <div style={{ fontWeight: "bold", marginTop: "12px" }}>Falkirk</div>
                            <div>44 Cow Wynd, Falkirk, Central Region, FK1 1PU</div>
                            <div>Monday to Friday: 10:00am - 5:30pm</div>
                            <div>Saturday - By appointment only</div>
                            <div>Sunday: Closed</div>
                        </div>
                    )}
                    {deliveryMethod === "Postoffice" && (
                        <div style={{ marginTop: "10px", color: "#495464", fontSize: "15px" }}>
                            <div style={{ fontWeight: "bold", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                                Your order will be shipped with
                                <img
                                    src="/image 2.png"
                                    alt="FedEx"
                                    style={{ height: "28px", objectFit: "contain", verticalAlign: "middle" }}
                                />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {postoffices.map((office) => (
                                    <button
                                        key={office}
                                        type="button"
                                        onClick={() => setSelectedPostoffice(office)}
                                        style={{
                                            padding: "10px 12px",
                                            borderRadius: "6px",
                                            border: selectedPostoffice === office ? "2px solid #495464" : "1px solid #D3D3D3",
                                            background: selectedPostoffice === office ? "#495464" : "#fff",
                                            color: selectedPostoffice === office ? "#fff" : "#495464",
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                            textAlign: "left",
                                            transition: "all 0.2s",
                                        }}
                                    >
                                        {office}
                                    </button>
                                ))}
                            </div>
                            {/* Show map for selected post office */}
                            {selectedPostoffice && (
                                <div style={{ marginTop: "20px", borderRadius: "10px", overflow: "hidden" }}>
                                    <iframe
                                        title="Postoffice Map"
                                        width="100%"
                                        height="220"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        allowFullScreen
                                        referrerPolicy="no-referrer-when-downgrade"
                                        src={postofficeMaps[selectedPostoffice]}
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Payment Method Buttons with Logos */}
                <div
                    style={{
                        background: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                        padding: "24px",
                        minWidth: "220px",
                        maxWidth: "350px",
                        flex: 1,
                        width: "100%",
                        marginBottom: "24px",
                    }}
                >
                    <label style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "10px", display: "block" }}>
                        Choose payment method
                    </label>
                    <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
                        <button
                            type="button"
                            onClick={() => setPaymentMethod("credit")}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "10px 16px",
                                borderRadius: "6px",
                                border: paymentMethod === "credit" ? "2px solid #495464" : "1px solid #D3D3D3",
                                background: paymentMethod === "credit" ? "#495464" : "#fff",
                                color: paymentMethod === "credit" ? "#fff" : "#495464",
                                fontWeight: "bold",
                                cursor: "pointer",
                                transition: "all 0.2s",
                            }}
                        >
                            <FaCcVisa size={28} />
                            <FaCcMastercard size={28} />
                            Credit Card
                        </button>
                        <button
                            type="button"
                            onClick={() => setPaymentMethod("paypal")}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "10px 16px",
                                borderRadius: "6px",
                                border: paymentMethod === "paypal" ? "2px solid #495464" : "1px solid #D3D3D3",
                                background: paymentMethod === "paypal" ? "#495464" : "#fff",
                                color: paymentMethod === "paypal" ? "#fff" : "#495464",
                                fontWeight: "bold",
                                cursor: "pointer",
                                transition: "all 0.2s",
                            }}
                        >
                            <FaCcPaypal size={28} />
                            Paypal
                        </button>
                        <button
                            type="button"
                            onClick={() => setPaymentMethod("apple")}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "10px 16px",
                                borderRadius: "6px",
                                border: paymentMethod === "apple" ? "2px solid #495464" : "1px solid #D3D3D3",
                                background: paymentMethod === "apple" ? "#495464" : "#fff",
                                color: paymentMethod === "apple" ? "#fff" : "#495464",
                                fontWeight: "bold",
                                cursor: "pointer",
                                transition: "all 0.2s",
                            }}
                        >
                            <FaCcApplePay size={28} />
                            Apple Pay
                        </button>
                    </div>
                </div>
            </div>

          
            {/* Responsive styles */}
            <style>
                {`
                @media (max-width: 900px) {
                    .payment-main-row,
                    .payment-bottom-row {
                        flex-direction: column !important;
                        gap: 24px !important;
                    }
                    aside, section {
                        max-width: 100% !important;
                        min-width: 0 !important;
                    }
                }
                @media (max-width: 600px) {
                    .steps-container {
                        max-width: 100vw !important;
                        margin: 10px 0 !important;
                        font-size: 14px !important;
                    }
                    .payment-main-row,
                    .payment-bottom-row {
                        gap: 12px !important;
                    }
                    form, aside, .payment-main-row > section, .payment-bottom-row > div {
                        padding: 12px !important;
                        font-size: 15px !important;
                    }
                }
                `}
            </style>
        </div>
    );
}