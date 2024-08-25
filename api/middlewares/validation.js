const { body, validationResult } = require('express-validator');

exports.validatePost = [
    body('title').notEmpty().withMessage('O título é obrigatório'),
    body('content').notEmpty().withMessage('O conteúdo é obrigatório'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
