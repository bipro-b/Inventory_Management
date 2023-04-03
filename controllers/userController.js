const { signUpService, findUserByEmail } = require("../services/signUpService");
const { generateToken } = require("../utils/util");
exports.signUp = async (req, res, next) => {
  try {
    const user = await signUpService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Successfully signed up",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fails",
      message: "Fails to  signup",
      error: error.message,
    });
  }
};
/* 
1. Email and password checking
2. Load user from database with email
3. If not user send res
4. compare password
5. If password not correct send res
6. If password then check is active or not 
7. If not active send res
8. generate token
9. send user and token
 */
exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "Fail",
        error: "Email 0r Password is not found.",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: "Fail",
        error: "User is not found.",
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "Fail",
        error: "Password is not valid.",
      });
    }

    if (user.status != "active") {
      return res.status(401).json({
        status: "Fail",
        error: "Your Account is not active yet",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      status: "Success",
      message: "Successfully login",
      data:{
        user,token
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "Fails",
      message: "Fails to  login",
      error: error.message,
    });
  }
};
