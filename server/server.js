// server.js

const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Firebase Admin SDK
const serviceAccount = require('node/tupc-fc73d-firebase-adminsdk-hebyy-a706383d6f.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/project/tupc-fc73d/database/tupc-fc73d-default-rtdb/data/~2F',
});

// Middleware
app.use(bodyParser.json());

// Firebase Realtime Database reference
const db = admin.database();
const qrCodesRef = db.ref('qrcodes');

// API endpoint to save scanned QR code
app.post('/api/qrcodes', (req, res) => {
  try {
    const { data } = req.body;
    const qrCodeRef = qrCodesRef.push();
    qrCodeRef.set({ data });
    res.status(201).json({ message: 'QR code saved successfully' });
  } catch (error) {
    console.error('Error saving QR code:', error);
    res.status(500).json({ error: 'Error saving QR code' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
