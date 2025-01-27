const path = require("path");
const fs = require("fs");
const express = require("express");
const multer = require("multer");

var router = express.Router();
const imgs_dir = path.join(process.cwd(), "images");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = imgs_dir;
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Custom filename logic
    const originalName = file.originalname;
    const extension = path.extname(originalName); // Extract the file extension
    const baseName = path.basename(originalName, extension); // Extract the base name

    // Set the file name as <original_name>_<timestamp>.<extension>
    const customName = req.query.filename
      ? `${req.query.filename}${path.extname(file.originalname)}`
      : `${baseName}${extension}`;

    //const customName = req.body.filename
    //  ? `${req.body.filename}${path.extname(file.originalname)}`
    //  : `${baseName}${extension}`;

    cb(null, customName);
  },
});

const upload = multer({ storage });

/* GET home page. */
router.get("/", function (req, res) {
  res.jsonp({ success: true, data: "Health check" });
});

router.post("/", upload.single("image"), (req, res) => {
  console.log(req.body);

  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  res.status(201).jsonp({ sucess: true, data: { name: file.originalname } });
});

router.get("/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(imgs_dir, filename);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath); // Send the file to the client
  } else {
    res.status(404).send("File not found.");
  }
});

router.delete("/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(imgs_dir, filename);

  fs.unlink(filePath, (err) => {
    if (err) res.status(404).jsonp(err);

    res.sendStatus(201);
  });
});

module.exports = router;
