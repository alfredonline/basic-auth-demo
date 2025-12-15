import connectDB from "@/lib/db";
import React from "react";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";
import { getSecretMessage } from "@/actions/secret-actions";
const page = async () => {
  await connectDB();

  const { userId } = await auth();
  console.log("User ID:", userId);
  if (!userId) {
    return <div>Not signed in</div>;
  }

  const user = await User.findOne({ clerkId: userId });

  console.log(user)

  if (!user) {
    console.log("No user found");
    return <div>User not found</div>;
  }

  const secretMessage = await getSecretMessage()

  return <div>{secretMessage}</div>;
};

export default page;
