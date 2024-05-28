export const emailTemplate = (otp: number): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your OTP Code</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f6f6f6;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background-color: #4CAF50;
          color: #ffffff;
          padding: 20px;
          text-align: center;
          font-size: 24px;
        }
        .content {
          padding: 20px;
        }
        .otp {
          font-size: 32px;
          font-weight: bold;
          color: #333333;
          text-align: center;
          margin: 20px 0;
          letter-spacing: 5px;
        }
        .message {
          font-size: 16px;
          color: #666666;
          margin-bottom: 20px;
          text-align: center;
        }
        .footer {
          background-color: #f6f6f6;
          color: #666666;
          padding: 10px;
          text-align: center;
          font-size: 14px;
        }
        .footer a {
          color: #4CAF50;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          Secure Your Account
        </div>
        <div class="content">
          <p class="message">Your One-Time Password (OTP) to access your account is:</p>
          <div class="otp">${otp}</div>
          <p class="message">Please enter this code to proceed. This code is valid for the next 10 minutes.</p>
          <p class="message">If you did not request this code, please ignore this email or contact support.</p>
        </div>
        <div class="footer">
          <p>Thank you for using our services!</p>
          <p>If you have any questions, feel free to <a href="mailto:support@example.com">contact us</a>.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}