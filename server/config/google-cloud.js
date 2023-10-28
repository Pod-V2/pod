const { Storage } = require("@google-cloud/storage");
const serviceKey = "./gcs_key.json";
require('dotenv').config();

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: process.env.GC_PROJECT_ID,
});

const bucketName = process.env.BUCKET_NAME;
const bucket = storage.bucket(bucketName);

/**
  * Receive a file as Buffer and file info as file-type output.
  * Upload file to Google Cloud Storage bucket.
  * @param {Buffer} file - image file to be uploaded
  * @param {Object} fileInfo - output from file-type
  * @param {string} fileInfo.ext - file extension
  * @param {string} userid - user ID to generate unique file name
  */
async function uploadImage(file, fileInfo, userid='') {
  // Generate file name as timestamp
  const fileName = `${userid}${Date.now()}.${fileInfo.ext}`;

  // Create reference to file on GCS and save
  const cloudFile = bucket.file(fileName);
  await cloudFile.save(file)

  // Generate image URL - need public bucket
  const imageUrl = process.env.BUCKET_URL+fileName;
  return imageUrl;
}

async function deleteFile(fileName) {
  await storage.bucket(bucketName).file(fileName).delete();
  console.log(`gs://${bucketName}/${fileName} deleted`);
}


module.exports = uploadImage;
