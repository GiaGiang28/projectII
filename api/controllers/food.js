import { db } from "../connect.js";

export const getfood = (req, res) => {
  const query = "SELECT * FROM da.fooditem";
  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);
    return res.json(result);
  });
};

export const addFood = (req, res) => {
  if (isNaN(req.body.price)) {
    return res.status(409).json("Price must be 1 number");
  }
  const query = "SELECT * FROM fooditem WHERE name = ?";
  db.query(query, [req.body.title], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length) return res.status(409).json("Item already exists");

    const q =
      "INSERT INTO fooditem(name, price, category, imageURL) VALUES (?);";
    const values = [
      req.body.title,
      req.body.price,
      req.body.category,
      req.body.imageUrl,
    ];
    db.query(q, [values], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Successfully");
    });
  });
};

export const deleteFood = (req, res) => {
  // const token = req.cookies.access_token;
  // if (!token) return res.status(401).json("Not authenticated!");
  // jwt.verify(token, "jwtkey", (err, userInfo) => {
  //   if (err) return res.status(403).json("Token is not valid!");
  //   const postId = req.params.id;
  //   const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
  //   db.query(q, [postId, userInfo.id], (err, data) => {
  //     if (err) return res.status(403).json("You can delete only your post!");
  //     return res.json("Post has been deleted!");
  //   });
  // });

  const foodId = req.params.id;
  const q = "DELETE FROM fooditem WHERE `id` = ?";
  db.query(q, [foodId], (err, data) => {
    if (err) return res.status(403).json("You can't delete food!");
    return res.json("food has been deleted!");
  });
};

export const editFood = (req, res) => {
  if (isNaN(req.body.price)) {
    return res.status(409).json("Price must be 1 number");
  }
  const foodId = req.params.id;
  const q =
    "UPDATE fooditem SET name = ?, price = ?, category = ?, imageURL = ? WHERE id = ?;";
  const values = [
    req.body.title,
    req.body.price,
    req.body.category,
    req.body.imageUrl,
    foodId,
  ];
  db.query(q, values, (err, data) => {
    if (err) return res.status(403).json("You can't edit food!");
    return res.json("food has been edited!");
  });
};
