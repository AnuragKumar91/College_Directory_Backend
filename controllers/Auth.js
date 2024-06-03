const bcrypt = require("bcrypt");
const User = require("../modals/Users");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config;

//singup handlers
exports.Signup = async (req, res) => {
  try {
    //get data

    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    //secure password

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "error in hasing password",
      });
    }

    //create entry
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(200).json({
      success: true,
      message: "user created succesfuuly",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.Login = async (req, res) => {
  try {
    //data fetch

    const { email, password } = req.body;

    //validation on email and password

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully",
      });
    }

    //check for registred user

    const user = await User.findOne({ email });
    //agar user register nahi hai

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    const payload = {
      email: User.email,
      id: User,
      role: User.role,
    };
    //verify password and generate a JSW Token
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {});
      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 100),
        httOnly: true,
      };
      res.cookie("anuragcookie", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User logged in successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "login failed",
    });
  }
};
exports.ForgetPassword = async (req, res) => {
  const { email } = req.body;
  console.log("ForgetPassword called with email:", email);

  try {
    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User with this email does not exist",
      });
    }

    const secret = process.env.JWT_SECRET + user.password;
    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "5m",
    });
    // const link = `http://localhost:5000/api/reset-password/${user._id}/${token}`;
    const link = `http://localhost:5173/update-password/${user._id}/${token}`;

    console.log("Reset link generated:", link);

    // Send email with the reset link
    //   const mailOptions = {
    //     from: process.env.EMAIL,
    //     to: user.email,
    //     subject: 'Password Reset',
    //     text: `Click the following link to reset your password: ${link}`,
    //   };

    //   transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       console.error("Error sending email:", error);
    //       return res.status(500).json({
    //         success: false,
    //         message: "Failed to send email",
    //       });
    //     }
    //     console.log("Email sent:", info.response);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "viratanu1234@gmail.com",
        pass: "drvr migp iurv luha",
      },
    });

    const mailOptions = {
      from: email,
      to: email, // Set the recipient email here
      subject: "Reset your password",
      html: `Click the following link to reset your password: ${link}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error sending email");
      }
      res.send("Email sent successfully");
    });
    res.status(200).json({
      statuscode: 200,
      success: true,
      message: "Password reset link has been sent to your email",
    });
  } catch (error) {
    console.error("Error in ForgetPassword:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.ResetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }

    const secret = process.env.JWT_SECRET + user.password;
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Invalid token or token expired" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      user.password = hashedPassword;
      await user.save();

      res.json({ message: "Password has been reset successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
