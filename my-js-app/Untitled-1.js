const res = await fetch(`http://localhost:3000/api/profile?email=${encodeURIComponent(email)}`);
const profile = await res.json();