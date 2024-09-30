const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // For sending emails
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure your email transport
let transporter = nodemailer.createTransport({
  service: 'Gmail', // or any other email service
  auth: {
    user: process.env.EMAIL_USER, // Use environment variable
    pass: process.env.EMAIL_PASS, // Use environment variable
  },
});

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  // Send email confirmation (you can modify the content as needed)
  let mailOptions = {
    from: 'no-reply@moodscape.io',
    to: email,
    subject: 'Thanks for subscribing!',
    text: 'Thank you for signing up for MoodScape updates!',
    html: '<b>Thank you for signing up for MoodScape updates!</b>',
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Subscription successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
