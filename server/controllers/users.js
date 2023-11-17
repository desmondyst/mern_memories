// import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        // database
        const existingUser = await User.findOne({ email });

        if (!existingUser)
            return res.status(404).json({ message: "User does not exists" });

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid Credential " });

        // create the jwt token, by providing all the information to be stored in the token
        // second argument is the secret string that is in .env file
        // third argument is the options
        const token = jwt.sign(
            {
                email: existingUser.email,
                id: existingUser._id,
            },
            process.env.JWT_SECRET_STRING,
            { expiresIn: "1h" }
        );

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        // error message
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const signUp = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try {
        //database
        const existingUser = await User.findOne({ email });

        if (existingUser)
            return res.status(400).json({ message: "User already exists" });

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords don't match" });
        }

        // second param is called salt, which is the difficulty of the password, usual is 12
        const hashedPassword = await bcrypt.hash(password, 12);

        //The User.create() method is a convenience method provided by Mongoose. It creates a new document (user in this case) and saves it to the database in a single step. It's equivalent to creating a new instance of the model and then calling save() on that instance.
        const createdUser = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
        });

        const token = jwt.sign(
            {
                email: createdUser.email,
                id: createdUser._id,
            },
            process.env.JWT_SECRET_STRING,
            { expiresIn: "1h" }
        );

        res.status(200).json({ result: createdUser, token });
    } catch (error) {
        // error message
        res.status(500).json({ message: "Something went wrong" });
    }
};
