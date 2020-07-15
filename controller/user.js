const User = require("../models/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.signUp = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }) //Checking if the email exist
    .then((user) => {
      if (user)
        res.status(409).json({ error: "The entered Email already exist!" });
      else {
        //Hashing the password
        bcrypt.hash(password, 10, (error, hash) => {
          if (error) res.status(500).json({ error });
          else {
            const userData = new User({
              _id: mongoose.Types.ObjectId(),
              email: email,
              password: hash,
              favouriteMovies: [],
            });
            userData
              .save()
              .then(() => {
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                  service: "gmail",
                  port: 587,
                  secure: false, // true for 465, false for other ports
                  auth: {
                    user: process.env.SENDER_EMAIL, // generated ethereal user
                    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
                  },
                });

                transporter
                  .sendMail({
                    from: process.env.SENDER_EMAIL,
                    to: `${email}`,
                    subject: "Welcome to iCinema",
                    text: `Hello Dear ${email}`,
                    html: `<b>Hello Dear User, we are happy that you join our family. Kind Regards, iCinema Team.</b>`,
                  })
                  .then((info) => console.log("Email has been sent!"))
                  .catch((err) => console.log(err));
                res.status(201).json({
                  message: "The user has been signed up successfully!",
                  userData,
                  favouriteMovies: [],
                });
              })
              .catch((error) => res.status(500).json({ error }));
          }
        });
      }
    });
};

exports.signIn = (req, res, next) => {
  const { password, email } = req.body;
  User.find({ email: email }, (err, user) => {
    if (err || user.length === 0)
      res.status(404).json({ error: "No user was found with this email." });
    else if (user.length > 0) {
      //Comparing password
      bcrypt.compare(password, user[0].password, (_err, result) => {
        if (_err) res.status(401).json({ error: "Authentication has failed!" });
        else if (result) {
          const userData = {
            email: user[0].email,
            ID: user[0]._id,
            favouriteMovies: user[0].favouriteMovies,
          };
          const token = jwt.sign(userData, "MONGO_SECRET", { expiresIn: "1h" });
          res.status(200).json({
            message: "Authentication has been successful",
            token: token,
            userData,
          });
        } else
          res.status(401).json({ error: "The password entered is incorrect!" });
      });
    }
  }).catch((err) => res.status(500).json({ error: err }));
};

exports.updateUser = (req, res, next) => {
  const userID = req.params.userID;

  User.updateMany({ _id: userID }, { $set: req.body })
    .then((result) => result.state(200).json(result))
    .catch((error) => res.status(409).json(error));
};

exports.deleteUser = (req, res, next) => {
  User.remove({ _id: req.params.userID })
    .then((result) => {
      if (result.length > 0)
        res.status(200).json({ message: "User has been deleted" });
      else res.status(404).json({ message: "No user was found with this ID" });
    })
    .catch((error) => res.status(200).json(error));
};

