import { sendEmail } from "@/lib/email";

export const EmailService = {
    async sendWelcomeEmail(email: string, name: string) {
        const subject = "Welcome to Startup Web!";
        const html = `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h1>Welcome, ${name}!</h1>
                <p>Thank you for joining Startup Web. We're excited to have you on board.</p>
                <p>If you have any questions, feel free to reply to this email.</p>
                <br>
                <p>Best regards,</p>
                <p>The Startup Web Team</p>
            </div>
        `;

        await sendEmail({
            to: email,
            subject,
            html,
        });
    },

    async sendPasswordResetEmail(email: string, token: string) {
        // Placeholder for future implementation
        console.log(`[EmailService] Sending password reset to ${email} with token ${token}`);
    },
};
