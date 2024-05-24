import jwt from "jsonwebtoken";
import { TokenData } from "../types/token.data";
import { NextFunction } from "express";
import userModel from "../models/user.model";
import { Types } from "mongoose";

const secretKey: string | undefined = process.env.SECRET_KEY;
const maxAge = 3 * 24 * 60 * 60;

export const auth = async (req: any, res: any, next: NextFunction) => {
  try {
    const authHeader: string | undefined = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      if (token) {
        if (secretKey) {
          const tokenData = jwt.verify(token, secretKey) as TokenData;

          if (tokenData) {
            const userId = tokenData._id;

            const checkUser = await checkUserId(userId, req, res);

            if (checkUser) {
              return next();
            }
          } else {
            res.status(500).send({
              message: "Internal Server Error",
            });
            throw new Error("tokenData is undefined!");
          }
        } else {
          res.status(500).send({
            message: "Internal Server Error",
          });
          throw new Error("Secret key is missing!");
        }
      } else {
        res.status(401).send({
          message: "Authorizatin token missing!",
        });
      }
    } else {
      res.status(400).send({
        message: "Authorization header is missing!",
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
  }
};

const checkUserId = async (userId: Types.ObjectId, req: any, res: any) => {
  try {
    const user = await userModel.findById({ _id: userId });

    if (user) {
      req.user = user;
      return true;
    }

    throw new Error("Token is Invalid!");
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
  }
};

export const createToken = (tokenPayload: TokenData): string => {
  try {
    if (secretKey) {
      return jwt.sign(tokenPayload, secretKey, {
        expiresIn: maxAge,
      });
    }

    throw new Error("Secret key is missing!");
  } catch (err: any) {
    throw new Error(err.message);
  }
};
