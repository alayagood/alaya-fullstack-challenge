const { body, validationResult } = require('express-validator');

const validatePostFields = [
  body('post.name').trim().notEmpty().withMessage('Name is required'),
  body('post.title').trim().notEmpty().withMessage('Title is required'),
  body('post.content').trim().notEmpty().withMessage('Content is required'),

  // Optional validations for image fields
  body('post.images')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Images must be an array with at least one element')
    .custom((images, { req }) => {
      if (images && images.length > 0) {
        const fileAttachments = req.files || [];
        const fileNames = fileAttachments.map((file) => file.filename);
        const invalidImages = images.filter((image) => !fileNames.includes(image));

        if (invalidImages.length > 0) {
          throw new Error('Invalid image attachments');
        }
      }

      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, title, content, images } = req.body.post;

    // Additional validations
    if (name.length > 50) {
      return res.status(400).json({ message: 'Name field exceeds the maximum length of 50 characters' });
    }

    if (title.length > 100) {
      return res.status(400).json({ message: 'Title field exceeds the maximum length of 100 characters' });
    }

    if (content.length > 1000) {
      return res.status(400).json({ message: 'Content field exceeds the maximum length of 1000 characters' });
    }

    // Validations for file extension and size
    const fileAttachments = req.files || [];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    for (const file of fileAttachments) {
      const { originalname, size } = file;
      const fileExtension = originalname.split('.').pop().toLowerCase();
      const allowedExtensions = ['jpg', 'jpeg', 'png'];

      if (!allowedExtensions.includes(fileExtension)) {
        return res.status(400).json({ message: 'Invalid file extension' });
      }

      if (size > maxFileSize) {
        return res.status(400).json({ message: 'File size exceeds the maximum limit' });
      }
    }

    // All validations passed, proceed to the next middleware
    next();
  },
];

module.exports = {
  validatePostFields,
};
