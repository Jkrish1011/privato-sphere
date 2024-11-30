import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

import { compare } from "bcrypt";

const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days

const createToken = (email, userId) => {
    return jwt.sign({email, userId}, process.env.JWT_KEY, {expiresIn: maxAge});
}

export const signup = async (request, response, next) => {
    try{
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send("Email and Password is Required!");
        }
        const user = await User.create({email: email, password: password});
        // JWT Token - for verification purposes.
        response.cookie("jwt", createToken(email, user.id), {
            maxAge, 
            secure: true,
            sameSite: "None",
        });
        return response.status(201).json({user: {
            id: user.id,
            email: user.email,
            profileSetup: user.profileSetup,
        }});
    }catch(err){
        console.error({err});
        return response.status(500).send("Internal Server Error");
    }
}

export const login = async (request, response, next) => {
    try{
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send("Email and Password is Required!");
        }
        const user = await User.findOne({email: email});

        if(!user) {
            return response.status(404).send("User with the given email not found!");
        }

        const auth = await compare(password, user.password);
        if (!auth) {
            return response.status(400).send("Password is incorrect");
        }

        // JWT Token - for verification purposes.
        response.cookie("jwt", createToken(email, user.id), {
            maxAge, 
            secure: true,
            sameSite: "None",
        });
        return response.status(200).json({user: {
            id: user.id,
            email: user.email,
            profileSetup: user.profileSetup,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            color: user.color,
        }});
    }catch(err){
        console.error({err});
        return response.status(500).send("Internal Server Error");
    }
}

export const getUserInfo = async (request, response, next) => {
    try{
        // console.log(request.userId);- The user ID is derived from the JWT token.

        // Query db to find the user with the given id.
        const userData = await User.findById(request.userId);
        if(!userData) {
            return response.status(404).send("User with the given id not found!");
        }
        return response.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
        });
    }catch(err){
        console.error({err});
        return response.status(500).send("Internal Server Error");
    }
}

export const updateProfile = async (request, response, next) => {
    try{
        const { userId } = request;
        const { firstName, lastName, color } = request.body;
        if(!firstName || !lastName) {
            return response.status(400).send("Firstname, Lastname, and Color is required for this api");
        }
        // {new: true} will return the updated data of the current userId, so we return the same to the frontend
        // {runValidators: true} will check for the constraints of each field, if it applies as per the Schema defined
        const userData = await User.findByIdAndUpdate(userId, {
            firstName, lastName, color, profileSetup: true
        }, { new: true , runValidators: true });

        return response.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
        });
    }catch(err){
        console.error({err});
        return response.status(500).send("Internal Server Error");
    }
}