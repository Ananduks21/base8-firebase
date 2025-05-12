'use server';

// This is a placeholder for actual email sending logic.
// In a real application, you would use a service like Nodemailer, SendGrid, Resend, etc.
export async function sendProductEnquiry(enquiryData) {
  const { name, email, message, productName, productId } = enquiryData;

  console.log('--- New Product Enquiry ---');
  console.log(`Product Name: ${productName} (ID: ${productId})`);
  console.log(`User Name: ${name}`);
  console.log(`User Email: ${email}`);
  console.log(`Message: ${message}`);
  console.log('--------------------------');

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate success/failure
  // const shouldSucceed = Math.random() > 0.1; // 90% success rate for testing failure
  const shouldSucceed = true; // For now, always succeed

  if (shouldSucceed) {
    return { success: true, message: 'Enquiry sent successfully.' };
  } else {
    return { success: false, message: 'Simulated error: Failed to send enquiry to admin.' };
  }
}
