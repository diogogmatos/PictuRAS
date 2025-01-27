const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  endpoint: `http://${process.env.MINIO_DOMAIN}`,
  accessKeyId: process.env.MINIO_ROOT_USER || "admin",
  secretAccessKey: process.env.MINIO_ROOT_PASSWORD || "admin123",
  s3ForcePathStyle: true,
  region: "us-east-1",
});

module.exports = s3;
