import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import passValidator from "password-validator";
import bcrypt from "bcryptjs";

export function POST(request) {
  try {
    const { email, name, mobileNo, otp, password, confirmPassword } =
      request.json(); // get all the form details for registration a new user
  } catch (error) {}
}
