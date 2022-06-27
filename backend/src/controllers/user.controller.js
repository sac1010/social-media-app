const db = require("../config/db");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  let findUserSql = `SELECT * FROM users WHERE email = ?;`;
  let sql = `INSERT INTO users (username,email, password) VALUES (?, ?, ?);`;
  await db.query(findUserSql, email, (err, response) => { 
    if (response.length>0) {
        res.send('user already exists');
      }
    else{
        bcrypt.hash(password, 8, async (err, hash) => {
            await db.query(sql, [username, email, hash], (err, response) => {
              if (err) {
                res.send(err);
              } else { 
                res.send("user created");
              }
            });
          });
    }
  })

});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let sql = `SELECT * FROM users WHERE email = ?;`;
  await db.query(sql, email, (err, response) => {
    if (response.length < 1) {
      res.send({ message: "user doesn't exist" });
    } else {
        let user  = response[0]
      bcrypt.compare(password, response[0].password, (error, response) => {
        if (response) {
          res.send(user);
        } else {
          res.send({ message: "invalid username or password" });
        }
      });
    }
  });
});

module.exports = router;
