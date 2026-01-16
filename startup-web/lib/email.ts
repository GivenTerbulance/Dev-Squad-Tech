import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || '"Startup Web" <noreply@startupweb.com>';

// Create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true for 465, false for other ports
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

export const sendEmail = async ({
    to,
    subject,
    html,
    text,
}: {
    to: string;
    subject: string;
    html: string;
    text?: string;
}) => {
    // If no credentials, log to console (Development mode)
    if (!SMTP_HOST || !SMTP_USER) {
        console.log('-----------------------------------');
        console.log(`[Email Mock] To: ${to}`);
        console.log(`[Email Mock] Subject: ${subject}`);
        console.log(`[Email Mock] HTML: ${html}`);
        console.log('-----------------------------------');
        return;
    }

    try {
        const info = await transporter.sendMail({
            from: SMTP_FROM,
            to,
            subject,
            text: text || html.replace(/<[^>]*>?/gm, ''), // Fallback text
            html,
        });

        console.log(`Message sent: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};
