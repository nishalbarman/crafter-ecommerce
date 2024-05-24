import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import PasswordValidator from "password-validator";

import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/user.model";
import {
  hasOneSpaceBetweenNames,
  isValidEmail,
} from "custom-validator-renting";

const validatePass = new PasswordValidator();
validatePass.is().min(8).has().uppercase().has().lowercase();

connect();

const checkUserRole = checkRole(0);

export async function PATCH(req) {
  try {
    const roleCheckResult = checkUserRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const reqBody = await req.json();

    const error = [];

    const email = reqBody?.email;
    const name = reqBody?.name;
    const password = reqBody?.password;

    const updateObject = {};
    if (email) {
      if (!isValidEmail(email)) {
        error.push("Invalid email");
      }
      updateObject.email = email;
    }

    if (name) {
      if (!hasOneSpaceBetweenNames(name)) {
        error.push("Full name required");
      }
      updateObject.name = name;
    }

    if (password) {
      if (!validatePass.validate(password)) {
        error.push(
          "Password should be of minimum 8 digits containing uppercase and lowercase characters"
        );
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPass = bcrypt.hashSync(password, salt);
      updateObject.password = hashedPass;
    }

    if (error.length > 0) {
      return NextResponse.json(
        { message: error.join(", ") },
        {
          status: 400,
        }
      );
    }

    await User.findOneAndUpdate(
      { _id: userDetails._id },
      {
        $set: updateObject,
      }
    );

    // const jwtToken = jwt.sign(
    //   {
    //     _id: update._id,
    //     name: update.name,
    //     role: update.role.role,
    //     email: update.email,
    //     mobileNo: update.mobileNo,
    //   },
    //   secret
    // );

    // return res.status(200).json({
    //   message: "User Updated",
    //   user: {
    //     name: update.name,
    //     email: update.email,
    //     mobileNo: update.mobileNo,
    //     jwtToken: jwtToken,
    //   },
    // });

    return NextResponse.redirect("/logout");
  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.Error && error?.errors) {
      const errArray = Object.values(error.errors).map(
        (properties) => properties.message
      );

      return NextResponse.json(
        {
          message: errArray.join(", "),
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
