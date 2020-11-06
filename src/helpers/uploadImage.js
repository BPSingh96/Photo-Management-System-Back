const multer = require("multer");
const Path = require('path');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "resources/public");
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file;
    if ( file.fieldname ==="image" && (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5 // 5MB
    },
    fileFilter: fileFilter
  });
  

module.exports = { upload };
