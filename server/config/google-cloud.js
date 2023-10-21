const { Storage } = require("@google-cloud/storage");
const path = require("path");
const serviceKey = path.join("../gcs_key.json");

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: "pod-402500",
});

const bucket = storage.bucket("pod-ninja-turtle");

function uploadImage(file) {
  console.log("Invoking Google Cloud uploadImage")
  console.log(file)
  // return new Promise((resolve, reject) => {
  //   const { originalname, buffer } = file;

  //   const blob = bucket.file(originalname.replace(/ /g, "_"));
  //   const blobStream = blob.createWriteStream({
  //     resumable: false,
  //   });
  //   blobStream
  //     .on("finish", () => {
  //       const publicUrl = format(
  //         `https://storage.googleapis.com/${bucket.name}/${blob.name}`
  //       );
  //       resolve(publicUrl);
  //     })
  //     .on("error", () => {
  //       reject(`Unable to upload image, something went wrong`);
  //     })
  //     .end(buffer);
  // });
}

module.exports = uploadImage;
