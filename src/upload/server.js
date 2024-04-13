const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());

const upload = multer({
  dest: "uploads/",
});

app.post("/upload", upload.single("file"), function (req, res, next) {
  console.log("req.file", req.file);
  console.log("req.body", req.body);

  res.end(
    JSON.stringify({
      message: "success",
    })
  );
});

app.listen(3333);
