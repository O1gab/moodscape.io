const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const serviceAccount = require('./serviceAccountKey.json'); // Use the correct path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://moodscape-io.firebaseio.com"
});

const db = admin.firestore();

// Configure your email transport
let transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com', port: 465, secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email is required');
  }

   try {
    const snapshot = await db.collection('subscribers')
      .where('email', '==', email)
      .get();

    if (!snapshot.empty) {
      // Email already exists, send a 409 status (Conflict)
      return res.status(409).json({ message: 'Email already exists' });
    }

    await db.collection('subscribers').add({ email });

    // Send email confirmation
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thanks for subscribing!',
      text: 'Thank you for signing up for MoodScape updates!',
      html: '<b>Thank you for signing up for MoodScape updates!</b>',
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send('Subscription successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing subscription');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
