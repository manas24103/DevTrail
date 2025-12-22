import nodemailer from 'nodemailer';

// Create transporter ONCE
const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
}
});

// Generic email sender
const sendEmail = async ({ to, subject, html }) => {
await transporter.sendMail({
    from: `"DevTrail" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
});
};

// Password reset email
export const sendPasswordResetEmail = async (to, resetUrl) => {
await sendEmail({
    to,
    subject: 'Password Reset Request',
    html: `
    <p>You requested a password reset.</p>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}">Reset Password</a>
    <p>This link expires in 10 minutes.</p>
    `
});
};

// Welcome email
export const sendWelcomeEmail = async (to, name) => {
await sendEmail({
    to,
    subject: 'Welcome to DevTrail 🎉',
    html: `
    <h3>Welcome ${name}!</h3>
    <p>Your account has been created successfully.</p>
    <p>We're glad to have you on board.</p>
    `
});
};
