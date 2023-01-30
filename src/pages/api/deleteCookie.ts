import { NextApiRequest, NextApiResponse } from "next";

import cookie from "cookie";

const deleteCookie = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("jwt", "", {
      /* httpOnly: true,
      secure: process.env.NODE_ENV !== "development", */
      expires: new Date('August 19, 1975 23:15:30 GMT-11:00'),
      sameSite: "strict"
      /* path: "/", */
    })
  );
  res.statusCode = 200;
  res.json({ success: true });
};

export default deleteCookie;