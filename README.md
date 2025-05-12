# Base8 Furniture Store

This is a Next.js application for Base8, an online furniture and mattress store.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Configure Environment Variables:**
    *   Rename the `.env.example` file (if it exists) or create a new file named `.env` in the root directory.
    *   Open the `.env` file and add your Gmail credentials. You'll need to generate an **App Password** for your Gmail account if you have 2-Step Verification enabled (recommended).
        ```dotenv
        # .env
        GMAIL_USER=your-email@gmail.com
        GMAIL_PASS=your-generated-app-password
        ```
    *   Follow the instructions in the `.env` file comments for generating an App Password or enabling Less Secure App Access (less recommended). **Crucially, the email sending feature (product enquiry form) will not work without valid credentials.**

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:9002](http://localhost:9002) (or your configured port) with your browser to see the result.

## Features

*   Browse a catalog of furniture and mattresses.
*   View detailed product information in a modal popup.
*   Filter products by category, price, and search term.
*   Submit enquiries about specific products via an email form.
*   Responsive design for various screen sizes.

## Key Technologies

*   Next.js (App Router)
*   React
*   Tailwind CSS
*   Shadcn/ui components
*   Nodemailer (for email sending)
*   React Hook Form (for form handling)
*   Zod (for form validation)

## Email Configuration Notes

The application uses Nodemailer with Gmail to send product enquiries from the contact form to the admin email address (`ananduks21@gmail.com` as configured in `src/app/actions/send-enquiry-action.js`).

**Troubleshooting Email Issues:**

*   **"Server configuration error: Email credentials missing or empty"**: Ensure `GMAIL_USER` and `GMAIL_PASS` are correctly set in your `.env` file.
*   **"Authentication failed" / "Invalid Credentials"**:
    *   Double-check your `GMAIL_USER` and `GMAIL_PASS` in `.env`.
    *   Make sure you are using an **App Password** in `GMAIL_PASS` if 2-Step Verification is enabled on your Gmail account. Your regular Gmail password will not work.
    *   If 2FA is disabled, ensure "Less Secure App Access" is enabled (use with caution).
*   **Other Errors**: Check the server console logs (`npm run dev` terminal) for more detailed Nodemailer error messages (e.g., connection timeouts, network issues).
