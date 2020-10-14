const { jsxExpressionContainer } = require("@babel/types");
const express = require("express");
const router = express.Router();
const db = require("../../db/database");
const inputCheck = require("../../utils/inputCheck");

// gets all voters
router.get("/voters", (req, res) => {
  const sql = `SELECT * FROM voters ORDER BY last_name`;
  const params = [];

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.send(500).json({ error: err.message });
      return;
    }

    res.json({
      message: "Success",
      data: rows,
    });
  });
});

// gets voters by id
router.get("/voter/:id", (req, res) => {
  const sql = `SELECT * FROM voters
    WHERE id = ?`;
  const params = [req.params.id];

  db.get(sql, params, (err, row) => {
    if (err) {
      res.send(500).json({ error: err.message });
      return;
    }

    res.json({
      message: "Success",
      data: row,
    });
  });
});

// post route for updating
router.post("/voter", ({ body }, res) => {
  const errors = inputCheck(body, "first_name", "last_name", "email");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO voters (first_name, last_name, email)
    VALUES (?, ?, ?)`;
  const params = [body.first_name, body.last_name, body.email];

  db.run(sql, params, function (err, data) {
    if (err) {
      res.send(500).json({ error: err.message });
      return;
    }

    res.json({
      message: "Success",
      data: body,
      id: this.lastID,
    });
  });
});

// put route for updating email
router.put("/voter/:id", (req, res) => {
  const errors = inputCheck(req.body, "email");
  if (errors) {
    res.send(400).json({ errors: err.message });
    return;
  }

  const sql = `UPDATE voters 
  SET email = ?
  WHERE id = ?`;
  const params = [req.body.email, req.params.id];

  db.run(sql, params, function (err, data) {
    if (err) {
      res.send(400).json({ error: err.message });
      return;
    }

    res.json({
      message: "Success",
      data: req.body,
      changes: this.changes,
    });
  });
});

// delete route to remove voters
router.delete("/voter/:id", (req, res) => {
  const sql = `DELETE FROM voters
    WHERE id = ?`;

  db.run(sql, req.params.id, function (err, result) {
    if (err) {
      res.send(400).json({ error: err.message });
      return;
    }

    res.json({
      message: "deleted",
      changes: this.changes,
    });
  });
});

module.exports = router;
