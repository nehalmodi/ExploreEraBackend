const multer = require('multer');
const uuid = require('uuid');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const fileUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/images');
      },
      filename: (req, file, cb) => {
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, uuid.v1() + '.' + ext);
      }
    }),
    fileFilter: (req, file, cb) => {
      const isValid = !!MIME_TYPE_MAP[file.mimetype];
      if (!isValid) {
        const error = new Error('Invalid mime type!');
        error.code = 'INVALID_MIME_TYPE';
        return cb(error, false);
      }
      cb(null, true);
    }
  });
  

module.exports = fileUpload;
