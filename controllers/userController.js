const { getUserByEmail, addUser } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


exports.signup= async(req,res)=>{
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message: "Please provide all required fields"
            });
        }

        let user = await getUserByEmail(email.toLowerCase());
        if(user){
            return res.status(400).json({
                success:false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = {
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        }

        user.id = await addUser(user);
        res.json({
            success: true,
            message: "User created successfully",
            data:user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

exports.login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        if(!email ||!password){
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }

        const user = await getUserByEmail(email.toLowerCase());

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }


        const token = jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        );

        delete user.password;

        res.cookie("token", token, {
            maxAge: process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000,
        })
            .status(200)
            .json({
                success: true,
                message: "User logged in successfully",
                user,
                token
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}