'use server';

import nodemailer from 'nodemailer';

export async function sendProductEnquiry(enquiryData) {
  const { name, email, message, productName, productId } = enquiryData;

  // Ensure environment variables are loaded.
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.error('CRITICAL: Gmail credentials (GMAIL_USER or GMAIL_PASS) not found in environment variables. Email will not be sent.');
    return { success: false, message: 'Server configuration error: Email credentials missing. Please contact support.' };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your preferred email service provider
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS, // For Gmail, this should be an App Password if 2FA is enabled
    },
    // Adding timeout options for debugging connection issues
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000, // 10 seconds
    socketTimeout: 10000, // 10 seconds
  });

  const mailOptions = {
    from: `"Base8 Enquiries" <${process.env.GMAIL_USER}>`, // Using a static sender name
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
    console.log(`Attempting to send email to ${mailOptions.to} from ${mailOptions.from} regarding ${productName}`);
    const info = await transporter.sendMail(mailOptions);
    console.log('Enquiry email sent successfully. Message ID:', info.messageId);
    return { success: true, message: 'Enquiry sent successfully.' };
  } catch (error) {
    // Log extensive error details on the server for debugging
    console.error('Failed to send email. Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    
    let clientMessage = 'Failed to send enquiry due to a server error. Please try again later or contact support.';

    if (error.code === 'EAUTH') {
      console.error('Nodemailer Authentication Error: This often means incorrect GMAIL_USER/GMAIL_PASS, or Gmail security settings are blocking access (e.g., "Less Secure App Access" is OFF, or an "App Password" is required if 2FA is enabled).');
      clientMessage = 'Authentication failed with the email server. Please ensure server email credentials and security settings are correct. Contact support if the issue persists.';
    } else if (error.code === 'ECONNREFUSED') {
      console.error('Nodemailer Connection Refused: The mail server actively refused the connection. Check mail server status and network configuration.');
      clientMessage = 'Could not connect to the email server. Please try again later or contact support.';
    } else if (error.code === 'EENVELOPE') {
      console.error('Nodemailer Envelope Error: There might be an issue with the sender or recipient email addresses.', { from: mailOptions.from, to: mailOptions.to });
      clientMessage = 'There was an issue with the email recipient or sender address. Please contact support.';
    } else if (error.code) { // Other Nodemailer specific errors
      console.error(`Nodemailer Error Code: ${error.code}. Message: ${error.message}. Command: ${error.command}`);
    } else { // Generic error
      console.error(`Generic error during email sending: ${error.message}`);
    }
    
    return { success: false, message: clientMessage };
  }
}