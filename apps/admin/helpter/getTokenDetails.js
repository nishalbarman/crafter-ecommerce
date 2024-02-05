import jwt from "jsonwebtoken";

export default function (token) {
  try {
    const secret = process.env.SECRET || "YOUR SECRET CODE FOR JWT";
    jwt.verify(token, secret, function (error, decoded) {
      if (error) return null;
      return decoded;
    });
  } catch (err) {
    return null;
  }
}
