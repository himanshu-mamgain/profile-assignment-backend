import { Types } from "mongoose";

export interface TokenData {
  _id: Types.ObjectId;
  phone: string;
  email: string;
}
