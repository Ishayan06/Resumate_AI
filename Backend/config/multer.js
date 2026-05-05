const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({

  // where uploaded files go
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },

  // rename uploaded file
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
});

module.exports = upload;