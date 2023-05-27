const { body, validationResult } = require('express-validator');

const validatePostFields = [
    body('post')
        .custom((value, { req }) => {
            let post;
            try {
                post = JSON.parse(value);
            } catch {
                throw new Error('Invalid post data');
            }

            if (!post.name || !post.title || !post.content) {
                throw new Error('Name, title and content are required');
            }
            return true;
        }),

    body('image')
        .optional()
        .custom((value, { req }) => {
            if (!req.is('multipart/form-data')) {
                throw new Error('Invalid Content-Type, expected multipart/form-data');
            }

            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, title, content } = JSON.parse(req.body.post);

        if (name.length > 50) {
            return res.status(400).json({ message: 'Name field exceeds the maximum length of 50 characters' });
        }

        if (title.length > 100) {
            return res.status(400).json({ message: 'Title field exceeds the maximum length of 100 characters' });
        }

        if (content.length > 1000) {
            return res.status(400).json({ message: 'Content field exceeds the maximum length of 1000 characters' });
        }

        if (req.files && req.files.image) {
            const { originalname, size } = req.files.image;
            const fileExtension = originalname.split('.').pop().toLowerCase();
            const allowedExtensions = ['jpg', 'jpeg', 'png'];
            const maxFileSize = 5 * 1024 * 1024; // 5MB

            if (!allowedExtensions.includes(fileExtension)) {
                return res.status(400).json({ message: 'Invalid file extension' });
            }

            if (size > maxFileSize) {
                return res.status(400).json({ message: 'File size exceeds the maximum limit' });
            }
        }

        next();
    },
];

module.exports = {
    validatePostFields,
};
