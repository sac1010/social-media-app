const db = require("../config/db");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: "1000000" },
//   fileFilter: (req, file, cb) => {
//     const fileTypes = /jpeg|jpg|png|gif/;
//     const mimeType = fileTypes.test(file.mimetype);
//     const extname = fileTypes.test(path.extname(file.originalname));

//     if (mimeType && extname) {
//       return cb(null, true);
//     }
//     cb("Give proper files formate to upload");
//   },
// }).single("image");

router.get("", async (req, res) => {
  let perPage = 9;
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

router.get("/:userId", async (req, res) => {
  let perPage = 9;
  const search = req.query.search;
  const sort = req.query.sort || "DESC";
  const page = req.query.page || 1;
  const userId = req.params.userId;

  var totalPages;

  let sql = `SELECT * FROM posts WHERE userId=${userId} ${
    search && `AND title LIKE '%${search}%'`
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



router.post("", upload.single("imgUrl"), async (req, res) => {
  const { title, description, userId } = req.body;
  const imgUrl = req.file.path;
  let sql = `INSERT INTO posts (imgUrl, title, description, userId) VALUES (?, ?, ?, ?);`;
  await db.query(sql, [imgUrl, title, description, userId], (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(imgUrl);
    }
  });
});

module.exports = router;
