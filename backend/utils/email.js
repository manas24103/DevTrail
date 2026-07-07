import nodemailer from 'nodemailer';

let transporter = null;

// Dynamic transporter initializer
const getTransporter = async () => {
  if (transporter) return transporter;

  const hasCredentials = process.env.EMAIL_USER && process.env.EMAIL_PASS;

  if (hasCredentials) {
    console.log("Using configured Gmail SMTP credentials");
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } else {
    console.log("EMAIL_USER/EMAIL_PASS not configured in .env. Creating Ethereal SMTP test account...");
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log(`\n=================== ETHEREAL DEV EMAIL SERVICE ACTIVE ===================`);
      console.log(`Username: ${testAccount.user}`);
      console.log(`Password: ${testAccount.pass}`);
      console.log(`Check emails at: https://ethereal.email`);
      console.log(`=========================================================================\n`);
    } catch (err) {
      console.warn("Failed to contact Ethereal SMTP. Activating terminal log mailer fallback.", err.message);
      transporter = {
        sendMail: async (options) => {
          console.log("\n=================== dev-mail-log: MOCK EMAIL LOGGED ===================");
          console.log(`FROM: ${options.from}`);
          console.log(`TO: ${options.to}`);
          console.log(`SUBJECT: ${options.subject}`);
          console.log("-------------------------- HTML BODY --------------------------");
          console.log(options.html.trim());
          console.log("========================================================================\n");
          return { messageId: "dev-mock-id", previewUrl: "console" };
        }
      };
    }
  }

  return transporter;
};

// Generic email sender helper
const sendEmail = async ({ to, subject, html }) => {
  const activeTransporter = await getTransporter();
  const info = await activeTransporter.sendMail({
    from: `"DevTrail" <${process.env.EMAIL_USER || 'no-reply@devtrail.dev'}>`,
    to,
    subject,
    html
  });

  // Log preview URL if using Ethereal
  const previewUrl = nodemailer.getTestMessageUrl(info);
  if (previewUrl) {
    console.log(`\n📬 Dev Email Preview URL: ${previewUrl}\n`);
  }
  return info;
};

// Password reset email
export const sendPasswordResetEmail = async (to, resetUrl) => {
  await sendEmail({
    to,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 2px solid black; max-width: 500px;">
        <h2 style="text-transform: uppercase;">Password Reset Request</h2>
        <p>You requested a password reset for your DevTrail account.</p>
        <p>Click the link below to reset your password:</p>
        <div style="margin: 20px 0;">
          <a href="${resetUrl}" style="background-color: #FF3366; color: white; padding: 10px 20px; text-decoration: none; border: 2px solid black; font-weight: bold; box-shadow: 3px 3px 0px 0px rgba(0,0,0,1);">RESET PASSWORD</a>
        </div>
        <p>This link expires in 10 minutes.</p>
      </div>
    `
  });
};

// Welcome email
export const sendWelcomeEmail = async (to, name) => {
  await sendEmail({
    to,
    subject: 'Welcome to DevTrail 🎉',
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 2px solid black; max-width: 500px; background-color: #FFFDF0;">
        <h2 style="text-transform: uppercase; color: #FF3366;">Welcome to DevTrail, ${name}! 🎉</h2>
        <p>Your account has been created successfully.</p>
        <p>We're glad to have you on board. Start tracking your ratings, solving problems, and contributing to the discussions!</p>
        <p>Keep coding!</p>
      </div>
    `
  });
};
