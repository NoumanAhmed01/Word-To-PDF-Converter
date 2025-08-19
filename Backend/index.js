const multer = require("multer");
const docxToPdf = require("docx-pdf");
const cors = require("cors");
const path = require("path");
const express = require("express");
const app = express();
const PORT = 3000;

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/convertFile", upload.single("file"), function (req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No such file uploaded!",
      });
    }
    let outputPath = path.join(
      __dirname,
      "files",
      `${req.file.originalname}.pdf`
    );
    docxToPdf(req.file.path, outputPath, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error accur while Converting to pdf.",
        });
      }
      res.download(outputPath, () => {
        console.log("file downloaded");
      });
      console.log("result" + result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server error!",
    });
  }
});

app.listen(PORT, () => {
  console.log("Server is listinig on Port : 3000");
});
