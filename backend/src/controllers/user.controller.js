const db = require("../config/db");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  let findUserSql = `SELECT * FROM users WHERE email = ?;`;
  let sql = `INSERT INTO users (username,email, password) VALUES (?, ?, ?);`;
  await db.query(findUserSql, email, (err, response) => {
    if (response.length > 0) {
      res.status(400).send("user already exists");
    } else {
      bcrypt.hash(password, 8, async (err, hash) => {
        await db.query(sql, [username, email, hash], (err, response) => {
          if (err) {
            res.send(err);
          } else {
            res.status(201).send("user created");
          }
        });
      });
    }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let sql = `SELECT * FROM users WHERE email = ?;`;
  await db.query(sql, email, (err, response) => {
    if (response.length < 1) {
      res.status(404).send({ message: "user not found" });
    } else {
      let user = response[0];
      bcrypt.compare(password, response[0].password, (error, response) => {
        if (response) {
          res.status(200).send(user);
        } else {
          res.status(400).send({ message: "invalid username or password" });
        }
      });
    }
  });
});

module.exports = router;
