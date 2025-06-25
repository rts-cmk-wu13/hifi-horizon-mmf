import React, { useEffect, useState, useMemo } from "react";
import ProfileTabs from "./ProfileTabs";
const style = {
  genralDiv: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: "8px",
    width: "78%",
    marginBottom: "2rem",
    maxWidth: 600,
    margin: "2rem auto",
    border: "1px solid #eee",
    boxShadow: "0 4px 24px #0001",
    padding: "2em",
  },
  sectionTitle: {
    fontWeight: 700,
    fontSize: "1.2em",
    margin: "1.5em 0 0.5em 0",
    color: "#ff6a08",
    textAlign: "left",
  },
  label: {
    fontWeight: 600,
    marginTop: "1em",
    marginBottom: "0.2em",
    color: "#495464",
    textAlign: "left",
  },
  value: {
    marginBottom: "0.8em",
    color: "#222",
    textAlign: "left",
  },
  orderBox: {
    background: "#f7f7f7",
    borderRadius: "6px",
    padding: "1em",
    marginBottom: "1em",
    textAlign: "left",
    border: "1px solid #eee",
  },
  footer: {
    marginTop: "3em",
    fontSize: "0.95em",
    color: "#888",
    textAlign: "center",
    borderTop: "1px solid #eee",
    paddingTop: "2em",
  },
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
    setUser(storedUser);

    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    if (storedUser?.email) {
      const userOrders = storedOrders.filter(
        (order) => order.userEmail === storedUser.email
      );
      setOrders(userOrders.reverse());
    } else {
      setOrders([]);
    }
  }, []);


  const handleDeleteOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const filtered = allOrders.filter(
      (order) => !(order.id === id && order.userEmail === user.email)
    );
    localStorage.setItem("orders", JSON.stringify(filtered));
  };

  return (
    <ProfileTabs>
      <div className="genralDiv" style={style.genralDiv}>
        <div>
          <div style={style.sectionTitle}>Your recent orders</div>
          {orders.length === 0 && (
            <div style={style.orderBox}>No orders yet.</div>
          )}
          {orders.map((order) => (
            <div key={order.id} style={style.orderBox}>
              <div><b>Ordernumber:</b> {order.id}</div>
              <div>
                <b>Date:</b>{" "}
                {order.date
                  ? new Date(order.date).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </div>
              <div><b>Total:</b> DKK {order.total?.toFixed(2)}</div>
              <div>
                <b>Items:</b>{" "}
                {order.cart
                  ? order.cart.reduce(
                      (sum, item) => sum + (item.quantity || 1),
                      0
                    )
                  : 0}
              </div>
              <button
                onClick={() => handleDeleteOrder(order.id)}
                style={{
                  marginTop: "10px",
                  background: "#ff4d4f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "6px 16px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Delete Order
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={style.footer}>
        <div>
          Home &nbsp;|&nbsp; Returns & Refunds &nbsp;|&nbsp; Contact &nbsp;|&nbsp; Shop &nbsp;|&nbsp; Delivery
          <br />
          2 Joppa Rd, Edinburgh, EH15 2EU
        </div>
        <div style={{ marginTop: "1em" }}>
          About Us &nbsp;|&nbsp; Privacy Policy &nbsp;|&nbsp; 0131 556 7901 &nbsp;|&nbsp; Terms & Conditions
          <br />
          44 Cow Wynd, Falkirk, Central Region, FK1 1PU &nbsp;|&nbsp; 01324 629 011
        </div>
        <div style={{ marginTop: "1em" }}>
          HiFi Horizon (Edinburgh) Ltd is registered in Scotland. No: SC049298. Registered office: 2 Joppa Rd, Edinburgh EH15 2EU
          <br />
          Designed by WU07 :
        </div>
      </div>
    </ProfileTabs>
  );
}