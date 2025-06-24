import React, { useEffect, useState } from "react";
import { SlBasket } from "react-icons/sl";
import { FaCreditCard, FaFileInvoice } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Invoice() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0); // Subtotal of all items
    const [vat, setVat] = useState(0); // VAT amount
    const [total, setTotal] = useState(0); // Total amount including VAT and delivery
    const [customerDetails, setCustomerDetails] = useState({
        fullName: "",
        address: "",
        email: "",
        phone: "",
    });
    const VAT_RATE = 0.2; // 20% VAT
    const DELIVERY_COST = 4.0; // Delivery cost in GBP

    useEffect(() => {
        // Load cart from localStorage
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);

        // Load customer details from localStorage
        const storedDetails = JSON.parse(localStorage.getItem("paymentDetails")) || {};
        setCustomerDetails(storedDetails);

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
    }, []);

    // Generate and download the invoice as a PDF
    const downloadInvoice = () => {
        const doc = new jsPDF();

        // Add company and customer details
        doc.setFontSize(12);
        doc.text(customerDetails.fullName, 10, 10);
        doc.text(customerDetails.address, 10, 15);
        doc.text("United Kingdom", 10, 20);
        doc.text(`P: ${customerDetails.phone}`, 10, 25);
        doc.text(`M: ${customerDetails.email}`, 10, 30);

        doc.text("Delivery Address:", 10, 40);
        doc.text(customerDetails.address, 10, 45);
        doc.text("United Kingdom", 10, 50);
        doc.text(`Phone: ${customerDetails.phone}`, 10, 55);

        doc.text("Sales: sales@hifi-horizon.com", 10, 65);

        // Add invoice details
        doc.setFontSize(14);
        doc.text("Invoice", 150, 10);
        doc.setFontSize(12);
        doc.text("Order Number: 238475691", 150, 20);
        doc.text("Date: March 14, 2022", 150, 25);
        doc.text("Shop: 342 HIFI Horizon - Falkirk", 150, 30);
        doc.text("Currency: GBP", 150, 35);

        // Add table headers
        doc.setFontSize(12);
        doc.text("ITEM DESCRIPTION", 10, 80);
        doc.text("PRICE", 100, 80);
        doc.text("QUANTITY", 130, 80);
        doc.text("TOTAL", 160, 80);

        // Add cart items
        let y = 90; // Vertical position for items
        cart.forEach((item, index) => {
            const itemTotal = item.price_dkk * item.quantity;
            doc.text(`${index + 1}. ${item.product_name}`, 10, y);
            doc.text(`£ ${item.price_dkk.toFixed(2)}`, 100, y);
            doc.text(`${item.quantity}`, 130, y);
            doc.text(`£ ${itemTotal.toFixed(2)}`, 160, y);
            y += 10;
        });

        // Add subtotal, VAT, delivery, and total
        const subtotal = totalPrice;
        const vat = subtotal * VAT_RATE;
        const total = subtotal + vat + DELIVERY_COST;

        doc.text(`Subtotal: £ ${subtotal.toFixed(2)}`, 130, y + 10);
        doc.text(`VAT (20%): £ ${vat.toFixed(2)}`, 130, y + 20);
        doc.text(`Delivery: £ ${DELIVERY_COST.toFixed(2)}`, 130, y + 30);
        doc.text(`Total: £ ${total.toFixed(2)}`, 130, y + 40);

        // Footer
        doc.setFontSize(10);
        doc.text(
            "Address: 44 Cow Wynd, Falkirk, Central Region, FK1 1PU | Phone: 0131 556 7901 | Mail: sales@hifi-horizon.com",
            10,
            280
        );

        // Save the PDF
        doc.save("invoice.pdf");
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
                        height: "6px", // Thicker line
                        backgroundColor: "#D3D3D3",
                        margin: "0 15px",
                    }}
                ></div>

                {/* Step 3: Invoice */}
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
                        <FaFileInvoice />
                    </div>
                </div>
            </div>

            {/* Invoice Copy */}
            <div
                style={{
                    border: "1px solid #D3D3D3",
                    padding: "20px",
                    borderRadius: "5px",
                }}
            >
                <h1
                    style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        marginBottom: "20px",
                    }}
                >
                    Invoice
                </h1>
                <p>
                    <strong>Order Number:</strong> 238475691
                </p>
                <p>
                    <strong>Date:</strong> {new Date().toLocaleDateString("en-GB")}
                </p>
                <p>
                    <strong>Shop:</strong> 342 HIFI Horizon - Falkirk
                </p>
                <p>
                    <strong>Currency:</strong> GBP
                </p>

                <h2
                    style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginTop: "20px",
                    }}
                >
                    Order Details
                </h2>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "10px",
                    }}
                >
                    <thead>
                        <tr>
                            <th
                                style={{
                                    border: "1px solid #D3D3D3",
                                    padding: "8px",
                                }}
                            >
                                Item
                            </th>
                            <th
                                style={{
                                    border: "1px solid #D3D3D3",
                                    padding: "8px",
                                }}
                            >
                                Price
                            </th>
                            <th
                                style={{
                                    border: "1px solid #D3D3D3",
                                    padding: "8px",
                                }}
                            >
                                Quantity
                            </th>
                            <th
                                style={{
                                    border: "1px solid #D3D3D3",
                                    padding: "8px",
                                }}
                            >
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={index}>
                                <td
                                    style={{
                                        border: "1px solid #D3D3D3",
                                        padding: "8px",
                                    }}
                                >
                                    {item.product_name}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #D3D3D3",
                                        padding: "8px",
                                    }}
                                >
                                    £ {item.price_dkk.toFixed(2)}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #D3D3D3",
                                        padding: "8px",
                                    }}
                                >
                                    {item.quantity}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #D3D3D3",
                                        padding: "8px",
                                    }}
                                >
                                    £ {(item.price_dkk * item.quantity).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Subtotal, VAT, Delivery, and Total */}
                <h3 style={{ textAlign: "right", marginTop: "20px" }}>
                    Subtotal: £ {subtotal.toFixed(2)} <br />
                    VAT (20%): £ {vat.toFixed(2)} <br />
                    Delivery: £ {DELIVERY_COST.toFixed(2)} <br />
                    <strong>
                        Total: £ {total.toFixed(2)}
                    </strong>
                </h3>
            </div>
        </div>
    );
}