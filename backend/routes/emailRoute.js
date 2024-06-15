import express from "express";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "../email/utils.js";

const router = express.Router();
const resend = new Resend("re_GZ3YBvS3_PYxsHmgp9Us1rtDEeKeRwvcs");

router.post("/", async (req, res) => {
  const htmlContent = `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Dear ${req.body.user.name},</h2>
    <p style="font-size: 16px;">Your appointment on <strong>${
      req.body.date
    }</strong> at <strong>${req.body.time}</strong> is <strong style="color: ${
    req.body.status === "approved" ? "#4CAF50" : "#FF0000"
  };">${req.body.status}</strong>.</p>
    <p style="font-size: 14px; color: #666;">Here is your appointment basic information:</p>
    <p>Car Model: ${req.body.carModel}</p>
    <p>Car Plate: ${req.body.carPlate}</p>
    ${
      req.body.status === "approved"
        ? `<p>See you on that day.</p>`
        : `<p>Sorry for the inconvenience caused.</p>`
    }
    <hr style="border: 0; height: 1px; background: #ccc; margin: 20px 0;">
    <p style="font-size: 12px; color: #999;">If you have any questions, please contact ${
      req.body.admin.email
    }</p>
  </div>
`;

  try {
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "phxx04@gmail.com",
      subject: "Appointemnt Notification on Afford",
      html: htmlContent,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
});

export default router;
