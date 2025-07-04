const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;
const saltRounds = 10;

app.use(cors());
app.use(express.json()); // Parse JSON requests

const USERS_FILE = path.resolve(__dirname, 'users.json');

if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

function loadUsers() {
  if (fs.existsSync(USERS_FILE)) {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    console.log('Loaded users:', data); 
    return JSON.parse(data);
  }
  return [];
}

function saveUsers(users) {
  try {
    console.log('Saving users:', users); 
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users:', error);
  }
}

let users = loadUsers();

app.post('/api/register', async (req, res) => {
  const { email, password, fullname, phone, address1, address2, city, zipcode, country } = req.body;
  if (!email || !password || !fullname) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  users.push({ email, password: hashedPassword, fullname, phone, address1, address2, city, zipcode, country });
  saveUsers(users);
  res.status(201).json({ message: 'User registered' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const { password: _, ...safeUser } = user;
  res.json(safeUser);
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/api/profile', (req, res) => {
    users = loadUsers(); 
    const { email } = req.query;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const { password, ...safeUser } = user;
    res.json(safeUser);
});

app.delete('/api/profile', (req, res) => {
    const email = req.body.email || req.query.email;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    users = loadUsers();
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    users.splice(userIndex, 1);
    saveUsers(users);
    res.json({ message: 'User deleted' });
});

app.patch('/api/profile', (req, res) => {
    const { email, ...updates } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    users = loadUsers();
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    Object.keys(updates).forEach(key => {
        if (key !== "email") {
            user[key] = updates[key];
        }
    });
    saveUsers(users);
    res.json({ message: 'Profile updated' });
});

// Contact API Endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Request received:', req.body);
  const { name, email, message } = req.body;

  try {
    // Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address from .env
        pass: process.env.EMAIL_PASS, // Your Gmail App Password from .env
      },
    });

    // Email Options
    const mailOptions = {
      from: email, // Sender's email
      to: process.env.EMAIL_USER, // Your Gmail address (recipient)
      subject: `Contact Form Message from ${name}`,
      text: message,
    };

    // Send Email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).send({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ error: 'Failed to send email. Please try again later.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

