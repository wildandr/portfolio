import nodemailer from 'nodemailer';

export default async function(req, res) {
  const { name, email, message, source } = req.body;
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,  // Ganti dengan email Anda
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nSource: ${source}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
}
