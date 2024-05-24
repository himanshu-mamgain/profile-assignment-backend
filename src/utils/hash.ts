import bcrypt from "bcrypt";

export const generatePasswordHash = (password: string): Promise<string> => {
  try {
    return bcrypt.hash(password, 10);
  } catch (err: any) {
    throw new Error(err?.message);
  }
};

export const verifyPasswordHash = (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (err: any) {
    throw new Error(err?.message);
  }
};
