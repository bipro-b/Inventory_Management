const jwt = require("jsonwebtoken");
exports.generateToken = (userInfo) => {
  const paylod = {
    emaol: userInfo.email,
    role: userInfo.role,
  };
  const token = jwt.sign(paylod, process.env.TOKEN_SECRET, {
    expiresIn: "600000",
  });
  return token;
};

/* 
node
crypto.randomBytes(64).toString('hex')
*/