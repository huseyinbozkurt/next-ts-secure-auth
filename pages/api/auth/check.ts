import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authToken = req.cookies.auth_token;

  if (authToken === "authenticated") {
    return res.status(200).json({ isAuthenticated: true });
  }

  return res.status(401).json({ isAuthenticated: false });
}
