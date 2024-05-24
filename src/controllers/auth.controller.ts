import userModel from "../models/user.model";
import { sendMail } from "../services/email.service";
import { MailOptions } from "nodemailer/lib/json-transport";
import { User } from "../types/user";
import { generatePasswordHash, verifyPasswordHash } from "../utils/hash";
import { generateOTP } from "../utils/otp";
import { emailTemplate } from "../utils/email.template";
import { createToken } from "../utils/auth";

export const registerUser = async (req: any, res: any) => {
  try {
    const { name, email, phone, password } = req.body;

    if (name && email && phone && password) {
      const userExists = await userModel.findOne({
        phone,
      });

      if (!userExists) {
        const otp = generateOTP();
        const hashedPassword = await generatePasswordHash(password);

        const user = new userModel({
          name,
          email,
          phone,
          password: hashedPassword,
          otp,
        });

        try {
          const userData: User | any = await user.save();

          const mailOptions: MailOptions = {
            to: userData.email,
            from: process.env.USER,
            subject: "Verification OTP",
            html: emailTemplate(otp),
          };

          sendMail(mailOptions);

          res.status(200).send({
            message: "User registered successfully!",
            userId: userData._id,
          });
        } catch (err: any) {
          res.status(500).send({
            message: err?.message,
          });
          throw new Error(err.message);
        }
      } else {
        res.status(400).send({
          message: "User already exists!",
        });
      }
    } else {
      res.status(400).send({
        message: "Please provide all parameters!",
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
    throw new Error(err.message);
  }
};

export const loginUser = async (req: any, res: any) => {
  try {
    const { phone, password } = req.body;

    if (phone && password) {
      const user = await userModel.findOne({ phone });

      if (user && user.password && user.phone && user.email) {
        const decryptedPassword = await verifyPasswordHash(
          password,
          user.password
        );

        if (decryptedPassword) {
          const checkUserPassword = await userModel.findOne({
            phone,
            password: user.password,
          });

          if (checkUserPassword) {
            const token = createToken({
              _id: user._id,
              phone: user.phone,
              email: user.email,
            });

            res.status(200).send({
              message: "User logged in successfully!",
              accessToken: token,
              userId: user._id
            });
          } else {
            res.status(401).send({
              message: "Password is incorrect!",
            });
          }
        } else {
          res.status(500).send({
            message: "Something went wrong!",
          });
        }
      } else {
        res.status(401).send({
          message: "User not found!",
        });
      }
    } else {
      res.status(400).send({
        message: "Please provide all parameters!",
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
    throw new Error(err.message);
  }
};

export const verifyOtp = async (req: any, res: any) => {
  try {
    const { userId, otp } = req.body;

    if (userId && otp) {
      const user = await userModel.findById({ _id: userId });

      if (user) {
        if (user.otp === otp) {
          await userModel.updateOne({ _id: user._id }, { isVerified: true });

          res.status(200).send({
            message: "User verified successfully!",
          });
        } else {
          res.status(401).send({
            message: "Invalid Otp!",
          });
        }
      } else {
        res.status(404).send({
          message: "User not found!",
        });
      }
    } else {
      res.status(400).send({
        message: "Please provide userId and otp!",
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
    throw new Error(err.message);
  }
};
