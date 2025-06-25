import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ModifyButton from "../components/ModifyButton.jsx"; 
import Orders from "./orders";
import ProfileTabs from "./ProfileTabs"; 
import Spinner from "../components/load";
import Modify from "../components/Modify"; 

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
    
}

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [modifyField, setModifyField] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState(() => {
    const local = localStorage.getItem("user");
    const session = sessionStorage.getItem("user");
    return local ? JSON.parse(local) : session ? JSON.parse(session) : null;
  });
  const email = user ? user.email : null;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!email) return;
    fetch(`https://hifi-login-api.onrender.com/api/profile?email=${encodeURIComponent(email)}`)
      .then(res => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then(data => setProfile(data))
      .catch(err => setError(err.message));
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Inline save handler
  const handleSave = async (field, apiField) => {
    let payload;
    if (field === "address") {
      payload = { email: profile.email, ...editValue };
    } else {
      payload = { email: profile.email, [apiField]: editValue };
    }
    const res = await fetch("https://hifi-login-api.onrender.com/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      setMsg("Updated!");
      setEditingField(null);
      setProfile({ ...profile, [apiField]: editValue });
    } else {
      setMsg(data.message || "Failed to update.");
    }
  };

  // Field mapping for backend
  const fieldMap = {
    name: "fullname",
    phone: "phone",
    email: "email",
    address: "address1",
    password: "password"
  };

  if (error) return <div>{error}</div>;
  if (!profile) return <Spinner />;

  return (
    <ProfileTabs>
      <div style={style.genralDiv}>
        
        <div style={{
          marginBottom: "2em",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: "0"
        }}>
          {/* Name */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "1em " }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <i className="fa-solid fa-user profile-icon" style={{ fontSize: "2.5rem", marginRight: "20px", color: "#ffcaa7" }}></i>
              <div>
                <div style={{ fontWeight: 600, fontSize: "1.1em" }}>Name:</div>
                <div>{profile.fullname}</div>
                {editingField === "name" && (
                  <div style={{ marginTop: 8 }}>
                    <input
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                    />
                    <button
                      onClick={() => handleSave("name", "fullname")}
                      style={{ color: "orange", padding: "1em", border: "none", borderRadius: "4px", background: "#fff", fontWeight: 600, marginRight: "0.5em", cursor: "pointer" }}
                    >
                      Save
                    </button>
                    <button onClick={() => setEditingField(null)}>Cancel</button>
                    {msg && <div>{msg}</div>}
                  </div>
                )}
              </div>
            </div>
            <ModifyButton onClick={() => { setEditingField("name"); setEditValue(profile.fullname); setMsg(""); }} />
          </div>
          <hr style={{ width: "100%", border: "none", borderTop: "1px solid #eee", margin: 0 }} />

          {/* Phone */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "1em " }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <i className="fa-solid fa-phone profile-icon" style={{ fontSize: "2.5rem", marginRight: "20px", color: "#ffcaa7" }}></i>
              <div>
                <div style={{ fontWeight: 600, fontSize: "1.1em" }}>Phone number:</div>
                <div>{profile.phone || <span style={{ color: "#888" }}>No phone number provided</span>}</div>
                {editingField === "phone" && (
                  <div style={{ marginTop: 8 }}>
                    <input
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                    />
                    <button
                      onClick={() => handleSave("phone", "phone")}
                      style={{ color: "orange", padding: "1em", border: "none", borderRadius: "4px", background: "#fff", fontWeight: 600, marginRight: "0.5em", cursor: "pointer" }}
                    >
                      Save
                    </button>
                    <button onClick={() => setEditingField(null)}>Cancel</button>
                    {msg && <div>{msg}</div>}
                  </div>
                )}
              </div>
            </div>
            <ModifyButton onClick={() => { setEditingField("phone"); setEditValue(profile.phone || ""); setMsg(""); }} />
          </div>
          <hr style={{ width: "100%", border: "none", borderTop: "1px solid #eee", margin: 0 }} />

          {/* Email */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "1em " }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <i className="fa-solid fa-envelope profile-icon" style={{ fontSize: "2.5rem", marginRight: "20px", color: "#ffcaa7" }}></i>
              <div>
                <div style={{ fontWeight: 600, fontSize: "1.1em" }}>Email:</div>
                <div>{profile.email}</div>
                {editingField === "email" && (
                  <div style={{ marginTop: 8 }}>
                    <input
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                    />
                    <button
                      onClick={() => handleSave("email", "email")}
                      style={{ color: "orange", padding: "1em", border: "none", borderRadius: "4px", background: "#fff", fontWeight: 600, marginRight: "0.5em", cursor: "pointer" }}
                    >
                      Save
                    </button>
                    <button onClick={() => setEditingField(null)}>Cancel</button>
                    {msg && <div>{msg}</div>}
                  </div>
                )}
              </div>
            </div>
            <ModifyButton onClick={() => { setEditingField("email"); setEditValue(profile.email); setMsg(""); }} />
          </div>
          <hr style={{ width: "100%", border: "none", borderTop: "1px solid #eee", margin: 0 }} />

          {/* Address */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "1em " }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <i className="fa-solid fa-location-dot profile-icon" style={{ fontSize: "2.5rem", marginRight: "20px", color: "#ffcaa7" }}></i>
              <div>
                <div style={{ fontWeight: 600, fontSize: "1.1em" }}>Address:</div>
                <div>
                  {profile.address1}
                  {profile.zipcode ? ` ${profile.zipcode}` : ""}<br />
                  {profile.city ? ` ${profile.city}` : ""}<br />
                  {profile.country ? ` ${profile.country}` : ""}
                </div>
                {editingField === "address" && (
                  <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
                    <input
                      placeholder="Address"
                      value={editValue.address1}
                      onChange={e => setEditValue({ ...editValue, address1: e.target.value })}
                      style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                    />
                    <input
                      placeholder="Zipcode"
                      value={editValue.zipcode}
                      onChange={e => setEditValue({ ...editValue, zipcode: e.target.value })}
                      style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                    />
                    <input
                      placeholder="City"
                      value={editValue.city}
                      onChange={e => setEditValue({ ...editValue, city: e.target.value })}
                      style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                    />
                    <input
                      placeholder="Country"
                      value={editValue.country}
                      onChange={e => setEditValue({ ...editValue, country: e.target.value })}
                      style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                    />
                    <button
                      onClick={() => handleSave("address", null)}
                      style={{ color: "orange", padding: "1em", border: "none", borderRadius: "4px", background: "#fff", fontWeight: 600, marginRight: "0.5em", cursor: "pointer" }}
                    >
                      Save
                    </button>
                    <button onClick={() => setEditingField(null)}>Cancel</button>
                    {msg && <div>{msg}</div>}
                  </div>
                )}
              </div>
            </div>
            <ModifyButton onClick={() => {
              setEditingField("address");
              setEditValue({
                address1: profile.address1 || "",
                zipcode: profile.zipcode || "",
                city: profile.city || "",
                country: profile.country || ""
              });
              setMsg("");
            }} />
          </div>
          <hr style={{ width: "100%", border: "none", borderTop: "1px solid #eee", margin: 0 }} />

          {/* Password */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "1em " }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <i className="fa-solid fa-key profile-icon" style={{ fontSize: "2.5rem", marginRight: "20px", color: "#ffcaa7" }}></i>
              <div>
                <div style={{ fontWeight: 600, fontSize: "1.1em" }}>Password:</div>
                <div>********</div>
                {editingField === "password" && (
                  <div style={{ marginTop: 8 }}>
                    <input
                      type="password"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                    />
                    <button
                      onClick={() => handleSave("password", "password")}
                      style={{ color: "orange", padding: "1em", border: "none", borderRadius: "4px", background: "#fff", fontWeight: 600, marginRight: "0.5em", cursor: "pointer" }}
                    >
                      Save
                    </button>
                    <button onClick={() => setEditingField(null)}>Cancel</button>
                    {msg && <div>{msg}</div>}
                  </div>
                )}
              </div>
            </div>
            <ModifyButton onClick={() => { setEditingField("password"); setEditValue(""); setMsg(""); }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: "1em" }}>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              borderRadius: "4px",
              background: "#FF6900",
              color: "#fff",
              border: "none",
              fontWeight: 600,
              fontSize: "1em",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
        {/* Render Modify component conditionally */}
        {modifyField && (
          <Modify
            field={modifyField.field}
            value={modifyField.value}
            onClose={() => setModifyField(null)}
            email={profile.email}
          />
        )}
      </div>
    </ProfileTabs>
  );
}