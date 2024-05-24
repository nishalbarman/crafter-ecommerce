import { NextResponse } from "next/server";
import getTokenDetails from "./getTokenDetails";

const checkRole = (...allowedRoles) => {
  return (req) => {
    try {
      const token = req.cookies.get("token")?.value;
      if (!token) {
        const reqUrl = new URL(req.url);
        const url = new URL("/auth/login", reqUrl.origin);
        url.searchParams.append("redirect", reqUrl.pathname);
        return NextResponse.redirect(url);
      }

      const userDetails = getTokenDetails(token);
      if (!userDetails) {
        return NextResponse.json(
          { message: "Access denied: Invalid token." },
          { status: 401 }
        );
      }

      req.user = userDetails;

      if (!allowedRoles.includes(userDetails.role)) {
        return NextResponse.json(
          { message: "Access denied: Insufficient permissions." },
          { status: 403 }
        );
      }

      req.jwt = { role: userDetails.role };
      return null; // No error, continue
    } catch (error) {
      console.error("Role check error:", error);
      return NextResponse.json(
        { message: "Internal server error: Unable to process request." },
        { status: 500 }
      );
    }
  };
};

export default checkRole;
