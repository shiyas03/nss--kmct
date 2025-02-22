const verificationTemplate = (name, verificationLink) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Email Verification</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  text-align: center;
              }
              h2 {
                  color: #333;
              }
              p {
                  color: #555;
                  font-size: 16px;
              }
              .verify-btn {
                  display: inline-block;
                  padding: 12px 24px;
                  margin: 20px 0;
                  font-size: 16px;
                  font-weight: bold;
                  color: #ffffff;
                  background-color: #007bff;
                  text-decoration: none;
                  border-radius: 5px;
              }
              .verify-btn:hover {
                  background-color: #0056b3;
              }
              .footer {
                  margin-top: 20px;
                  font-size: 12px;
                  color: #777;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Email Verification</h2>
              <p>Hello <strong>${name}</strong>,</p>
              <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
              <a href="${verificationLink}" class="verify-btn">Verify Email</a>
              <p>If you did not request this, please ignore this email.</p>
              <p class="footer">© ${new Date().getFullYear()} NSS UNIT KMCT. All rights reserved.</p>
          </div>
      </body>
      </html>
    `;
  };
  
  module.exports = verificationTemplate;
  