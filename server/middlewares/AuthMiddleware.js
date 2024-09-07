import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("Cookies: ", req.cookies);
  const jwtKey = process.env.JWT_KEY;

  if (!jwtKey) {
    console.log("JWT secret key is not set!");
    return res.status(500).send("Internal Server Error");
  }

  if (!token) {
    return res.status(401).send("You are not authenticated!");
  }

  jwt.verify(token, jwtKey, (err, payload) => {
    if (err) {
      console.log("JWT verification error: ", err);
      return res.status(403).send("Token is not valid!");
    }
    req.userId = payload?.userId;
    next();
  });
};
