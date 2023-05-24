const { body, validationResult } = require('express-validator');

const validatePostFields = [
    body('post.name').trim().notEmpty().withMessage('Name is required'),
    body('post.title').trim().notEmpty().withMessage('Title is required'),
    body('post.content').trim().notEmpty().withMessage('Content is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, title, content } = req.body.post;

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

        // All validations passed, proceed to the next middleware
        next();
    }
];

module.exports = {
    validatePostFields,
};
