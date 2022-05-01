// const uuid = require('uuid');
const path = require('path');
const multer  = require('multer');

const storage = multer.diskStorage({
  destination : './uploads',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, "c"+uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({storage: storage})


module.exports = upload