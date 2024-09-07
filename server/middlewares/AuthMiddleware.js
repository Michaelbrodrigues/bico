import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(req.cookies);
  const jwtKey = process.env.JWT_KEY;

  if (!jwtKey) {
    console.log("JWT secret key is not set!");
    return res.status(500).send("Internal Server Error");
  }
  
  if (!token) return res.status(401).send("You are not authenticated!");
  // we have to parse because its a string, but the best practice is to use decode from jsonwebtoken.
  const t = JSON.parse(token)?.jwt
  jwt.verify(t, process.env.JWT_KEY, async (err, payload) => {
    console.log(err);
    if (err) return res.status(403).send("Token is not valid!");
    req.userId = payload?.userId;
    next();
  });
};
