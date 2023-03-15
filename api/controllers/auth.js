import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const query = "SELECT * FROM users WHERE usersname = ?";
  db.query(query, [req.body.username], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length) return res.status(409).json("User already exists");

    const q =
      "INSERT INTO users(usersname, email, passwword, isAdmin) VALUES (?);";
    const values = [req.body.username, req.body.email, req.body.password, 0];
    db.query(q, [values], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User created successfully");
    });
  });
};

export const login = (req, res) => {
  const query = "SELECT * FROM users WHERE usersname = ?";
  db.query(query, [req.body.username], (err, result) => {
    if (result.length === 0) return res.status(500).json("UserName incorrect");
    if (result[0].passwword !== req.body.password)
      return res.status(409).json("Password incorrect");

    const token = jwt.sign({ id: result[0].id }, "secretkey");
    const { passwword, ...other } = result[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...other, token: token });
  });
};

export const logout = (req, res) => {};
