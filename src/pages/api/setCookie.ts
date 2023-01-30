import { NextApiRequest, NextApiResponse } from "next";

import cookie from "cookie";

const setCookie = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("jwt", req.body.refreshToken, {
      /* httpOnly: true, */
      /* secure: process.env.NODE_ENV !== "development", */
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  res.json({ success: true });
};

export default setCookie;