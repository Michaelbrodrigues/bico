import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies.jwt;
  const jwtKey = process.env.JWT_KEY;

  console.log(authHeader);
  console.log(cookieToken);
  console.log(jwtKey);

  if (!jwtKey) {
    console.log("JWT secret key is not set!");
    return res.status(500).send("Internal Server Error");
  }

  let token;
  let headertoken;

  // Check if the Authorization header exists and starts with "Bearer"
  if (authHeader && authHeader.startsWith("Bearer ")) {
    headertoken = authHeader.split(" ")[1];
    if (headertoken.includes("%7B%22jwt%22%3A%22")) {
      token = headertoken
        .replace("%7B%22jwt%22%3A%22", "")
        .replace(/%22%7D$/, "");
    } else {
      token = headertoken;
    }
  }
  // If no token from Authorization, use the cookie token
  if (!token && cookieToken) {
    if (cookieToken.includes("%7B%22jwt%22%3A%22")) {
      token = cookieToken
        .replace("%7B%22jwt%22%3A%22", "")
        .replace(/%22%7D$/, "");
    } else {
      token = cookieToken;
    }
  }

  console.log("Token: ", token);

  if (!token) {
    return res.status(401).send("You are not authenticated!");
  }

  // Verify the token using jsonwebtoken
  jwt.verify(token, jwtKey, (err, payload) => {
    console.log(err);
    if (err) return res.status(403).send("Token is not valid!");
    req.userId = payload?.userId;
    next();
  });
};
