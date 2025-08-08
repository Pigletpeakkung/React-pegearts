// pages/api/contact.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, company, subject, message, services, timestamp } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Here you can integrate with:
    // - Nodemailer for sending emails
    // - EmailJS
    // - SendGrid
    // - Resend
    // - Or any other email service

    // For now, we'll just log and return success
    console.log('Contact form submission:', {
      name,
      email,
      company,
      subject,
      message,
      services,
      timestamp
    });

    // Example with nodemailer (uncomment if you want to use it):
    /*
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: 'thanattsitt.info@yahoo.co.uk',
      subject: `New Contact: ${subject || 'Portfolio Inquiry'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${services.length > 0 ? `<p><strong>Services:</strong> ${services.join(', ')}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Sent on ${new Date(timestamp).toLocaleString()}</small></p>
      `
    };

    await transporter.sendMail(mailOptions);
    */

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
}
