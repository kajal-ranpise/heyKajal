const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  // Prevent SDK from adding x-amz-checksum-* to presigned URL signed headers.
  // Without this the browser PUT would need to compute & send the CRC32, which it can't.
  requestChecksumCalculation: 'WHEN_REQUIRED',
});

const getPresignedUrl = async (filename, contentType, folder = 'media') => {
  const safeName = filename.replace(/\s+/g, '-');
  const key = `${folder}/${Date.now()}-${safeName}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    ContentType: contentType,
  });
  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
  const publicUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  return { signedUrl, publicUrl };
};

module.exports = { getPresignedUrl };
