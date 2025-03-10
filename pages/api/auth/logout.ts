import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Clear the auth cookie by setting an expired cookie
  res.setHeader(
    "Set-Cookie",
    serialize("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0, // Immediately expire the cookie
    })
  );

  return res.status(200).json({ message: "Logged out successfully" });
}
