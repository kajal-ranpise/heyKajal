const { getPresignedUrl } = require('../middleware/s3');

const ALLOWED_IMAGE_TYPES = /^image\/(jpeg|png|gif|webp|svg\+xml)$/;
const ALLOWED_DOC_TYPES = /^application\/pdf$/;

exports.getUploadUrl = async (req, res) => {
  try {
    const { filename, contentType, folder = 'media' } = req.query;
    if (!filename || !contentType)
      return res.status(400).json({ message: 'filename and contentType are required' });
    const isImage = ALLOWED_IMAGE_TYPES.test(contentType);
    const isPdf = ALLOWED_DOC_TYPES.test(contentType);
    if (!isImage && !isPdf)
      return res.status(400).json({ message: 'Only image or PDF files are allowed' });
    const { signedUrl, publicUrl } = await getPresignedUrl(filename, contentType, folder);
    res.json({ signedUrl, publicUrl });
  } catch (err) {
    console.error('Presign error:', err.message);
    res.status(500).json({ message: err.message });
  }
};
