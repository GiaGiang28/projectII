import { db } from "../connect.js";

export const booking = (req, res) => {
  const query =
    "INSERT INTO bookingtable(name, phone, email, date, hour, userid) VALUES (?);";
  const values = [
    req.body.name,
    req.body.phone,
    req.body.email,
    req.body.date,
    req.body.time,
    req.body.userid,
  ];
  db.query(query, [values], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Booking Table successfully");
  });
};
