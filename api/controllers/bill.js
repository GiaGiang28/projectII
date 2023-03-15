import { db } from "../connect.js";

export const order = (req, res) => {
  const table = req.body.table;
  const foodOrder = req.body.foodOrder;
  db.query("SELECT status FROM tables WHERE id = ?;", [table], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data[0].status === 0)
      return res.status(409).json("Tables already in use");

    const query = "UPDATE tables SET status = '0' WHERE id = ?";
    db.query(query, [table], (err, data) => {
      if (err) return res.status(500).json(err);
    });

    db.query(
      "INSERT INTO bill (status, total_money, tableid, userid) VALUES (?);",
      [[0, req.body.totalPrice, table, req.body.userid]],
      (err, data) => {
        if (err) return res.status(500).json(err);
      }
    );

    db.query(
      "SELECT id FROM bill WHERE tableid = ? AND status = 0 AND userid = ?;",
      [table, req.body.userid],
      (err, data) => {
        const orderid = data[0].id;
        let q = "INSERT INTO billdetail (billid, foodid, quantity) VALUES (?)";
        for (let i = 0; i < foodOrder.length - 1; i++) {
          q = q + ", (?)";
        }
        const values = foodOrder.map((item) => [orderid, item.id, item.qty]);
        db.query(q, values, (err, result) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("Successfully");
        });
      }
    );
  });
};

export const getBill = (req, res) => {
  const tableID = req.params.id;
  db.query(
    "SELECT id, total_money FROM bill WHERE status = 0 AND tableid = ?",
    [tableID],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(409).json("Not Found");

      const billID = data[0].id;
      const total = data[0].total_money;

      const query =
        "SELECT f.id, f.name, f.price, f.imageURL, b.quantity FROM billdetail as b INNER JOIN fooditem as f ON b.foodid = f.id WHERE b.billid = ?;";
      db.query(query, [billID], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json({ food: data, total: total, billID: billID });
      });
    }
  );
};

export const editBill = (req, res) => {
  const billID = req.params.id;
  db.query(
    "UPDATE bill SET status = 1 WHERE id = ?;",
    [billID],
    (err, data) => {
      if (err) return res.status(500).json(err);
      db.query(
        "UPDATE tables SET status = 1 WHERE id = ?;",
        [req.body.tableID],
        (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("Successfully");
        }
      );
    }
  );
};
