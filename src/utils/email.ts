import dotenv from "dotenv";
dotenv.config();
const Mailjet = require("node-mailjet");
const mailjet = new Mailjet({
  apiKey: process.env.SMTP_API_KEY!,
  apiSecret: process.env.SMTP_SECRET_KEY!,
});

export const sendMail = async (name: string, email: string, otp: number) => {
  try {
    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.ADMIN_EMAIL,
            Name: "Admin",
          },
          To: [
            {
              Email: email,
              Name: name,
            },
          ],
          TemplateID: parseInt(process.env.TEMPLATE_ID!),
          TemplateLanguage: true,
          Subject: "Otp for cs-tracker-app",
          Variables: {
            otp,
          },
        },
      ],
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
