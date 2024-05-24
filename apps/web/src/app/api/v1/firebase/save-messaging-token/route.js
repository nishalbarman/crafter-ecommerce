import { NextResponse } from "next/server";

const express = require("express");
const router = express.Router();
const checkRole = require("../../middlewares");
const { FirebaseUtils } = require("firebase-utils");

const checkUserRole = checkRole(0);

export async function POST(req) {
  try {
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const reqBody = await req.json();

    const firebaseMessagingToken = reqBody.firebaseMessagingToken;
    const userId = req.user?._id;

    await FirebaseUtils.saveFirebaseTokenToDatabase({
      userId,
      firebaseMessagingToken,
    });

    return NextResponse.json(
      { message: "Token Saved" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error?.message },
      {
        status: 500,
      }
    );
  }
}
