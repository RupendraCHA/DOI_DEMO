import { transporter } from "./EmailConfig.js";
import {
  Verification_Email_Template,
  Welcome_Email_Template,
} from "./EmailTemplate.js";

export const SendVerificationCode = async (
  email,
  verificationCode,
  firstname,
  lastname
) => {
  try {
    const fullname = firstname + " " + lastname;
    const response = await transporter.sendMail({
      from: '"Visionsoft Inc." <chandaluri210@gmail.com>',
      to: email,
      subject: `Hi ${fullname}, Verify Your Email`,
      text: "Verify Your Email",
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ),
    });
  } catch (error) {
    console.log("Error occured in sending an email");
  }
};

export const WelcomeEmail = async (email, firstname, lastname) => {
  try {
    const fullname = firstname + " " + lastname;
    const response = await transporter.sendEmail({
      from: '"Visionsoft Inc." <chandaluri210@gmail.com>',
      to: email,
      subject: `Hi ${firstname}, Explore our Intutive reports from SAP HANA`,
      text: "Welcome to Visionsoft Inc.",
      html: Welcome_Email_Template.replace("{name}", fullname),
    });
  } catch (error) {
    console.log("Error occured in sending an Email");
  }
};
