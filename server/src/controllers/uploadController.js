const { getPresignedUrl } = require('../middleware/s3');

const ALLOWED_TYPES = /^image\/(jpeg|png|gif|webp|svg\+xml)$/;

exports.getUploadUrl = async (req, res) => {
  try {
    const { filename, contentType, folder = 'media' } = req.query;
    if (!filename || !contentType)
      return res.status(400).json({ message: 'filename and contentType are required' });
    if (!ALLOWED_TYPES.test(contentType))
      return res.status(400).json({ message: 'Only image files are allowed' });
    const { signedUrl, publicUrl } = await getPresignedUrl(filename, contentType, folder);
    res.json({ signedUrl, publicUrl });
  } catch (err) {
    console.error('Presign error:', err.message);
    res.status(500).json({ message: err.message });
  }
};
