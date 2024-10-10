const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
const corsOptions = {
  origin: ['https://moodscape.io', 'http://localhost:3000'],
  methods: ['POST', 'GET', 'OPTIONS']
};
app.use(cors(corsOptions));
app.use(express.json());

const serviceAccount = require('./serviceAccountKey.json');

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

const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to MoodScape</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;">
    <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #1a1b1a;">
      <tr>
        <td>
          <table align="center" cellpadding="0" cellspacing="0" width="500" style="border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0; background-color: #1a1b1a;">
                <h1 style="color: #1DB954; font-family: Arial, Helvetica, sans-serif;">Welcome to MoodScape!</h1>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px; background-color: #1a1b1a;">
                <p style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; color: #ffffff;">Thank you for signing up for our mailing list. We're excited to have you on board!</p>
                <p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #ffffff;">Stay tuned for updates on mood-based music recommendations, new features, and exclusive content.</p>
                <a href="https://moodscape.io" style="display: inline-block; padding: 15px 20px; font-family: Arial, sans-serif; font-size: 16px; color: #ffffff; background-color: #1DB954; text-decoration: none; border-radius: 25px; font-weight: bold;">Visit MoodScape</a>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px; background-color: #1a1b1a;">
                <p style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #666666;">© 2024 MoodScape. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  try {
    const snapshot = await db.collection('subscribers').where('email', '==', email).get();

    if (!snapshot.empty) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    await db.collection('subscribers').add({ email });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thanks for subscribing!',
      html: 'Welcome to MoodScape!',
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send('Subscription successful');
  } catch (error) {
    console.error('Error processing subscription:', error);
    res.status(500).send('Error processing subscription');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});