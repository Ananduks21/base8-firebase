'use server';

import nodemailer from 'nodemailer';

export async function sendProductEnquiry(enquiryData) {
  const { name, email, message, productName, productId } = enquiryData;

  // Ensure environment variables are loaded.
  // If GMAIL_USER or GMAIL_PASS are not set, the email will fail.
  // For production, ensure these are set in your deployment environment.
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.error('Gmail credentials not found in environment variables. Email will not be sent.');
    return { success: false, message: 'Server configuration error. Could not send email.' };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your preferred email service provider
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS, // For Gmail, this should be an App Password if 2FA is enabled
    },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.GMAIL_USER}>`, // Sender address (appears in "From" field)
    replyTo: email, // User's email to allow direct reply
    to: 'ananduks21@gmail.com', // Admin email address
    subject: `Product Enquiry for: ${productName} (ID: ${productId})`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #0f6347;">New Product Enquiry</h2>
        <p>You have received a new enquiry for the product: <strong>${productName}</strong> (Product ID: ${productId}).</p>
        <hr style="border: 0; border-top: 1px solid #eee;">
        <p><strong>User Details:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
        </ul>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f9f9f9; border-left: 4px solid #0f6347; padding: 10px 15px; margin-top: 5px;">
          <p style="margin: 0;">${message.replace(/\n/g, '<br>')}</p>
        </div>
        <hr style="border: 0; border-top: 1px solid #eee; margin-top: 20px;">
        <p style="font-size: 0.9em; color: #777;">This email was sent from the Base8 website enquiry form.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Enquiry email sent successfully.');
    return { success: true, message: 'Enquiry sent successfully.' };
  } catch (error) {
    console.error('Error sending email:', error);
    // Provide a more generic message to the user for security reasons
    return { success: false, message: 'Failed to send enquiry due to a server error. Please try again later.' };
  }
}
