import jwt from "jsonwebtoken";

export default function getTokenDetails(token) {
  try {
    console.log("Token details from cookies-->", token);
    const secret = process.env.SECRET || "YOUR SECRET CODE FOR JWT";
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    return null;
  }
}
