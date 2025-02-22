const nodemailer = require("nodemailer");
require("dotenv").config()
const verificationTemplate = require("./emailTemplate");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:"amigrootorwhat@gmail.com",
        pass: "kics jzbl lipb qdwn"
    }
});

const sendEmail = async (to, name, verificationLink) => {
    try {
        const emailHTML = verificationTemplate(name, verificationLink);
        const info = await transporter.sendMail({
            from: `"NSS unit kmct" ${process.env.EMAIL_USER}`,
            to,
            subject: "Verify Your Email Address",
            html: emailHTML
        });

        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};

// sendEmail("recipient@example.com", "Test Email", "Hello! This is a test email.");
module.exports = sendEmail;