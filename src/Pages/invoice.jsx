import React, { useEffect, useState } from "react";
import { SlBasket } from "react-icons/sl";
import { FaCreditCard, FaFileInvoice } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// If you use jsPDF for PDF download:
import jsPDF from "jspdf";
import logo from "/public/logo_sml 1.png";

export default function Invoice() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [vat, setVat] = useState(0);
    const [total, setTotal] = useState(0);
    const [customerDetails, setCustomerDetails] = useState({
        fullName: "",
        address: "",
        email: "",
        phone: "",
    });
    const [deliveryMethod, setDeliveryMethod] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [selectedPostoffice, setSelectedPostoffice] = useState("");
    const VAT_RATE = 0.2;
    const DELIVERY_COST = 4.0;

    useEffect(() => {
        // Load cart from localStorage
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);

        // Load customer details from localStorage
        const storedDetails = JSON.parse(localStorage.getItem("paymentDetails")) || {};
        setCustomerDetails(storedDetails);

        // Load delivery and payment method from localStorage
        setDeliveryMethod(localStorage.getItem("deliveryMethod") || "");
        setPaymentMethod(localStorage.getItem("paymentMethod") || "");
        setSelectedPostoffice(localStorage.getItem("selectedPostoffice") || "");

        // Calculate subtotal, VAT, and total dynamically
        const calculatedSubtotal = storedCart.reduce(
            (sum, item) => sum + item.price_dkk * item.quantity,
            0
        );
        const calculatedVat = calculatedSubtotal * VAT_RATE;
        const calculatedTotal = calculatedSubtotal + calculatedVat + DELIVERY_COST;

        setSubtotal(calculatedSubtotal);
        setVat(calculatedVat);
        setTotal(calculatedTotal);

        // Build the order object
        const order = {
            id: Date.now(), // unique id
            cart,
            subtotal,
            vat,
            total,
            customerDetails,
            deliveryMethod,
            paymentMethod,
            selectedPostoffice,
            date: new Date().toISOString(),
        };

        // Get existing orders or empty array
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        // Add new order
        orders.push(order);
        // Save back to localStorage
        localStorage.setItem("orders", JSON.stringify(orders));
    }, []);

    // Generate and download the invoice as a PDF
    const downloadInvoice = () => {
        const doc = new jsPDF();
        doc.setFontSize(14);
        doc.text("INVOICE", 10, 15);

        doc.setFontSize(11);
        doc.text("HIFI Horizon", 10, 25);
        doc.text("44 Cow Wynd, Falkirk, Central Region, FK1 1PU", 10, 30);
        doc.text("Phone: 0131 556 7901 | Mail: sales@hifi-horizon.com", 10, 35);

        doc.setFontSize(12);
        doc.text("Bill To:", 10, 45);
        doc.text(customerDetails.fullName, 10, 50);
        doc.text(customerDetails.address, 10, 55);
        doc.text(customerDetails.email, 10, 60);
        doc.text(customerDetails.phone, 10, 65);

        doc.text("Order Number: 238475691", 140, 25);
        doc.text(`Date: ${new Date().toLocaleDateString("en-GB")}`, 140, 30);
        doc.text("Shop: 342 HIFI Horizon - Falkirk", 140, 35);
        doc.text("Currency: GBP", 140, 40);

        doc.text("Delivery Method:", 10, 75);
        doc.text(deliveryMethod, 50, 75);
        if (deliveryMethod === "Postoffice" && selectedPostoffice) {
            doc.text("Selected Postoffice:", 10, 80);
            doc.text(selectedPostoffice, 50, 80);
        }

        doc.text("Payment Method:", 10, 90);
        doc.text(paymentMethod, 50, 90);

        // Table headers
        doc.setFontSize(12);
        doc.text("ITEM DESCRIPTION", 10, 105);
        doc.text("PRICE", 100, 105);
        doc.text("QUANTITY", 130, 105);
        doc.text("TOTAL", 160, 105);

        // Cart items
        let y = 115;
        cart.forEach((item, index) => {
            const itemTotal = item.price_dkk * item.quantity;
            doc.text(`${index + 1}. ${item.product_name}`, 10, y);
            doc.text(`£ ${item.price_dkk.toFixed(2)}`, 100, y);
            doc.text(`${item.quantity}`, 130, y);
            doc.text(`£ ${itemTotal.toFixed(2)}`, 160, y);
            y += 8;
        });

        // Totals
        y += 10;
        doc.text(`Subtotal: £ ${subtotal.toFixed(2)}`, 130, y);
        doc.text(`VAT (20%): £ ${vat.toFixed(2)}`, 130, y + 8);
        doc.text(`Delivery: £ ${DELIVERY_COST.toFixed(2)}`, 130, y + 16);
        doc.text(`Total: £ ${total.toFixed(2)}`, 130, y + 24);

        // Footer
        doc.setFontSize(10);
        doc.text(
            "Thank you for your order!",
            10,
            285
        );

        doc.save("invoice.pdf");
    };

    // Helper for payment method display
    const paymentMethodLabel = (method) => {
        if (method === "credit") return "Credit Card";
        if (method === "paypal") return "Paypal";
        if (method === "apple") return "Apple Pay";
        return method;
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", background: "#f7f7f7", minHeight: "100vh" }}>
            {/* Download PDF button */}
            <div style={{ textAlign: "right", marginBottom: "20px" }}>
                <button
                    onClick={downloadInvoice}
                    style={{
                        background: "#495464",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "10px 24px",
                        fontWeight: "bold",
                        fontSize: "16px",
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
                    }}
                >
                    Download PDF
                </button>
            </div>

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
                            backgroundColor: "#495464",
                            color: "white",
                            boxShadow: "0 0 10px rgba(0,0,0,0.53)",
                            width: "50px",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                            cursor: "pointer",
                            border: "2px solid #495464",
                        }}
                        onClick={() => navigate("/kurv")}
                    >
                        <SlBasket />
                    </div>
                </div>
                <div
                    style={{
                        flex: 1,
                        height: "6px",
                        backgroundColor: "#495464", // active color
                        margin: "0 15px",
                        borderRadius: "3px",
                    }}
                ></div>
                {/* Step 2: Payment */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                        style={{
                            backgroundColor: "#495464",
                            color: "white",
                            boxShadow: "0 0 10px rgba(0,0,0,0.53)",
                            width: "50px",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                            cursor: "pointer",
                            border: "2px solid #495464",
                        }}
                        onClick={() => navigate("/payment")}
                    >
                        <FaCreditCard />
                    </div>
                </div>
                <div
                    style={{
                        flex: 1,
                        height: "6px",
                        backgroundColor: "#495464", // active color for last line
                        margin: "0 15px",
                        borderRadius: "3px",
                    }}
                ></div>
                {/* Step 3: Invoice */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                        style={{
                            backgroundColor: "#495464",
                            color: "white",
                            boxShadow: "0 0 10px rgba(0,0,0,0.53)",
                            width: "50px",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                            border: "2px solid #495464",
                        }}
                    >
                        <FaFileInvoice />
                    </div>
                </div>
            </div>

            {/* Letter-style Invoice */}
            <div
                style={{
                    background: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                    padding: "40px 32px",
                    maxWidth: "700px",
                    margin: "0 auto",
                    fontSize: "16px",
                    lineHeight: "1.7"
                }}
            >
                {/* Logo and company info row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
                    <div>
                        <div style={{ fontWeight: "bold", fontSize: "22px", color: "#495464" }}>
                            HIFI Horizon
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <img
                            src={logo}
                            alt="HIFI Horizon Logo"
                            style={{ height: "60px", objectFit: "contain" }}
                        />
                        <div style={{ marginTop: "10px", textAlign: "right", fontSize: "15px", color: "#495464" }}>
                            44 Cow Wynd, Falkirk<br />
                            Central Region, FK1 1PU<br />
                            0131 556 7901<br />
                            sales@hifi-horizon.com
                        </div>
                    </div>
                </div>

                {/* Invoice Title and Info */}
                <div style={{ marginBottom: "32px" }}>
                    <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#495464" }}>Invoice</h1>
                    <div style={{ marginTop: "18px" }}>
                        <div style={{ display: "flex", gap: "16px", marginBottom: "6px" }}>
                            <span style={{ width: 140, color: "#495464" }}>Order number</span>
                            <span style={{ fontWeight: "bold" }}>238475691</span>
                        </div>
                        <div style={{ display: "flex", gap: "16px", marginBottom: "6px" }}>
                            <span style={{ width: 140, color: "#495464" }}>Date</span>
                            <span style={{ fontWeight: "bold" }}>
                                {new Date().toLocaleDateString("en-GB", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}
                            </span>
                        </div>
                        <div style={{ display: "flex", gap: "16px", marginBottom: "6px" }}>
                            <span style={{ width: 140, color: "#495464" }}>Shop</span>
                            <span style={{ fontWeight: "bold" }}>342 HIFI Horizon - Falkirk</span>
                        </div>
                        <div style={{ display: "flex", gap: "16px" }}>
                            <span style={{ width: 140, color: "#495464" }}>Currency</span>
                            <span style={{ fontWeight: "bold" }}>DKK</span>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: "32px" }}>
                    <div style={{ fontWeight: "bold" }}>Billed To:</div>
                    <div>{customerDetails.fullName}</div>
                    <div>{customerDetails.address}</div>
                    <div>{customerDetails.email}</div>
                    <div>{customerDetails.phone}</div>
                </div>

                <div style={{ marginBottom: "32px" }}>
                    <div style={{ fontWeight: "bold" }}>Delivery Method:</div>
                    <div>{deliveryMethod}</div>
                    {deliveryMethod === "Postoffice" && selectedPostoffice && (
                        <>
                            <div style={{ fontWeight: "bold", marginTop: "8px" }}>Selected Postoffice:</div>
                            <div>{selectedPostoffice}</div>
                        </>
                    )}
                    <div style={{ fontWeight: "bold", marginTop: "8px" }}>Payment Method:</div>
                    <div>{paymentMethodLabel(paymentMethod)}</div>
                </div>

                <div style={{ marginBottom: "32px" }}>
                    <div style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "10px" }}>Order Details</div>
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginTop: "10px",
                            fontSize: "15px"
                        }}
                    >
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid #D3D3D3", padding: "8px" }}>Item</th>
                                <th style={{ border: "1px solid #D3D3D3", padding: "8px" }}>Price</th>
                                <th style={{ border: "1px solid #D3D3D3", padding: "8px" }}>Quantity</th>
                                <th style={{ border: "1px solid #D3D3D3", padding: "8px" }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ border: "1px solid #D3D3D3", padding: "8px" }}>{item.product_name}</td>
                                    <td style={{ border: "1px solid #D3D3D3", padding: "8px" }}>DKK {item.price_dkk.toFixed(2)}</td>
                                    <td style={{ border: "1px solid #D3D3D3", padding: "8px" }}>{item.quantity}</td>
                                    <td style={{ border: "1px solid #D3D3D3", padding: "8px" }}>DKK {(item.price_dkk * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ textAlign: "right", fontSize: "16px" }}>
                    <div>Subtotal: <strong>DKK {subtotal.toFixed(2)}</strong></div>
                    <div>VAT (20%): <strong>DKK {vat.toFixed(2)}</strong></div>
                    <div>Delivery: <strong>DKK {DELIVERY_COST.toFixed(2)}</strong></div>
                    <div style={{ fontSize: "18px", marginTop: "8px" }}>
                        <strong>Total: DKK {total.toFixed(2)}</strong>
                    </div>
                </div>

                <div style={{ marginTop: "40px", color: "#495464", fontSize: "16px" }}>
                    <div>Thank you for shopping with HIFI Horizon!</div>
                    <div>If you have any questions, please contact us at sales@hifi-horizon.com</div>
                </div>
            </div>
        </div>
    );
}