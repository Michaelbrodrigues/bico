import express from 'express';
import multer from 'multer';
import cloudinary from '../cloudinaryConfig.js'; // Adjust the path as needed

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.array('images'), async (req, res) => {
  try {
    const uploadPromises = req.files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: 'profiles',
      })
    );

    const results = await Promise.all(uploadPromises);

    res.status(200).json({ images: results.map((result) => result.url) });
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed.' });
  }
});

export default router;
