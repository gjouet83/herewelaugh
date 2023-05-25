const { body, validationResult } = require('express-validator');

exports.email = [
  body('email')
    .not()
    .isEmpty()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('invalid email!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

exports.newEmail = [
  body('newEmail')
    .not()
    .isEmpty()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('invalid email !')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

exports.username = [
  body('username')
    .isLength({ min: 2, max: 30 })
    .withMessage('incorrect number of characters')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Invalid characters!'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

exports.profil = [
  body('username')
    .if(body('username').exists())
    .isLength({ min: 2, max: 30 })
    .withMessage('incorrect number of characters')
    .trim()
    .escape()
    .isAlphanumeric('fr-FR', { ignore: ' -_' })
    .withMessage('Invalid characters'),
  body('firstname').if(body('firstname').exists()).trim().escape(),
  body('lastname').if(body('lastname').exists()).trim().escape(),
  body('birthdate').if(body('birthdate').exists().trim().isDate()),
  body('describ').if(body('describ').exists()).trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

exports.password = [
  body('password').isStrongPassword().trim().isLength({ min: 12, max: 64 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

exports.newPassword = [
  body('newPassword').isStrongPassword().trim().isLength({ min: 12, max: 64 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

exports.content = [
  body('content').trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
