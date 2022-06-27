const db = require("../config/db");
const express = require("express");
const router = express.Router();

router.get("", async (req, res) => {
  let perPage = 8;
  const search = req.query.search;
  const sort = req.query.sort || "DESC";
  const page = req.query.page || 1;

  var totalPages;

  let sql = `SELECT * FROM posts ${
    search && `WHERE title LIKE '%${search}%'`
  } ORDER BY created_at ${sort} LIMIT ${(page - 1) * perPage}, ${perPage};`;

  let countSql = `SELECT COUNT(*) FROM posts`;

  await db.query(countSql, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      totalPages = Math.ceil(response[0]["COUNT(*)"] / perPage);
    }
  });

  await db.query(sql, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ response, totalPages });
    }
  });
});

router.post("", async (req, res) => {
  const { userId, imgUrl, title, description } = req.body;
  let sql = `INSERT INTO posts (imgUrl, title, description, userId) VALUES (?, ?, ?, ?);`;
  await db.query(sql, [imgUrl, title, description, userId], (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
});

module.exports = router;
