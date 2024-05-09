import { body } from "express-validator";

export const loginValidation = [
    body('email', 'Wrong email format').isEmail(),
    body('password', 'The password must be at least 5 characters long').isLength({ min: 5 }),
];

export const registerValidation = [
    body('email', 'Wrong email format').isEmail(),
    body('password', 'The password must be at least 5 characters long').isLength({ min: 5 }),
    body('fullName', 'Enter fullname').isLength({ min: 3 }),
    body('avatarUrl', "Bad URL's link").optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Enter post title').isLength({ min: 3 }).isString(),
    body('text', 'Enter post text').isLength({ min: 3 }).isString(),
    body('tags', "Bad format tags)").optional().isString(),
    body('imageUrl', "Bad url's image").optional().isString(),
];
