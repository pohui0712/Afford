import express from "express";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "../email/utils.js";

const router = express.Router();
const resend = new Resend("re_GZ3YBvS3_PYxsHmgp9Us1rtDEeKeRwvcs");

router.post("/", async (req, res) => {
  const { senderEmail, message } = req.body;

  // Simple server-side validation
  // if (!validateString(senderEmail, 500)) {
  //   return res.status(400).json({ error: "Invalid sender email" });
  // }
  // if (!validateString(message, 5000)) {
  //   return res.status(400).json({ error: "Invalid message" });
  // }

  console.log(senderEmail, message);
  try {
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "phxx04@gmail.com",
      subject: "Message from contact form",
      reply_to: senderEmail,
      html: `<p>${message}</p>`,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
});

export default router;
