const AWS = require("aws-sdk");
const path = require("path");

AWS.config.loadFromPath(__dirname + "/../config/awsConfig.json");

const s3 = new AWS.S3();
const multer = require("multer");
const multerS3 = require("multer-s3");

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "jeongmoon",
    key: (req, file, cb) => {
      const extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
    // 권한 설정
    acl: "public-read-write",
  }),
});

module.exports = upload;
