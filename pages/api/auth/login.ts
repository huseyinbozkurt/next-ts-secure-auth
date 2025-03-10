import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  if (username === "user" && password === "pass") {
    // Set an HTTP-only cookie to persist login state
    res.setHeader(
      "Set-Cookie",
      serialize("auth_token", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      })
    );
    return res.status(200).json({ message: "Login successful" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
}