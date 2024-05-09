import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


import UserModel from "../models/user.js";

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(404).json({
                message: 'User has not found'
            });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.password);

        if (!isValidPassword) {
            return res.status(400).json({
                message: 'Wrong login or password'
            });
        }

        const token = jwt.sign({
            _id: user._id,
        },
            'secret123',
            {
                expiresIn: '30d',
            }
        );

        const { password, ...userData } = user._doc

        res.json({
            ...userData, token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot login user'
        });
    }
}

export const register = async (req, res) => {
    try {
        const userPassword = req.body.password;
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(userPassword, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            password: passwordHash,
            avatarUrl: req.body.avatarUrl,
        });

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id,
        },
            'secret123',
            {
                expiresIn: '30d',
            }
        );

        const { password, ...userData } = user._doc

        res.json({
            ...userData, token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot register user'
        });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'User has not found'
            });
        }

        const { password, ...userData } = user._doc

        res.json({
            ...userData
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'You have not access'
        });
    }
}
