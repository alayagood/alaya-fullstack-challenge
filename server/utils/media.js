const config = require("config");
const AWS = require('aws-sdk');


const s3 = new AWS.S3({
    accessKeyId: config.get("aws.accessKeyId"),
    secretAccessKey:  config.get("aws.secretAccessKey"),
  });
  
  
class  Media {
     static async handleUpload(file, name) {
        const params = {
            Bucket: config.get("aws.bucket"),
            Key: name,
            Body: Buffer.from(file.buffer, 'base64'),
            ACL: 'public-read',
            ContentType: 'image/*'
        };
        
       await s3.putObject(params, (error, data) => {
            if (error) {
              console.error(error);
            } else {
              console.log(`Image uploaded properly ${params.Bucket}/${params.Key}`);
            }
        });
    }

}

module.exports = Media;