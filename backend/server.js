const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const db = require('./models/db');
const productRoutes = require('./routes/productRoutes');
const spareRoutes = require('./routes/spareRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// EMAIL ROUTE
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

app.post('/api/contact', async (req, res) => {
  const { name, phone, email, product, message } = req.body;
  const mailToCompany = { from: process.env.EMAIL_USER, to: process.env.EMAIL_TO, subject: `New Inquiry from ${name}`, html: `<p>Name: ${name}</p><p>Phone: ${phone}</p><p>Email: ${email}</p><p>Product: ${product}</p><p>Message: ${message}</p>` };
  const mailToCustomer = { from: process.env.EMAIL_USER, to: email, subject: `Thank you for your inquiry - B&C Technology`, html: `<h2>Dear ${name},</h2><p>Thank you for contacting us regarding ${product}. Our team will contact you within 24 hours.</p>` };
  try {
    await transporter.sendMail(mailToCompany);
    await transporter.sendMail(mailToCustomer);
    res.status(200).json({ success: true, message: "Emails sent" });
  } catch (error) { res.status(500).json({ success: false, message: "Failed to send emails" }); }
});

// AUTH ROUTES
app.get('/api/setup-admin', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await db.query('INSERT IGNORE INTO admins (email, password) VALUES (?, ?)', ['admin@bc.com', hashedPassword]);
    res.json({ message: "Admin created! Email: admin@bc.com, Password: admin123" });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ message: 'Invalid email' });
    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });
    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '1d' });
    res.json({ success: true, token });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// MOUNT ROUTES (અહીં ભૂલ હતી તે ફિક્સ કરી છે)
app.use('/api/products', productRoutes);
app.use('/api/spares', spareRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n✅ Backend Server running on http://localhost:${PORT}`);
});
