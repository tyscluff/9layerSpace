import express from 'express';
import User from '../schemas/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


//Initialize router
const router = express.Router();

//Generate a jwt
const generateAcessToken = (username) => {
    const secret = process.env.SECRET;
    return jwt.sign(username, secret)
}
 
router.post('/register', async (req, res) => {

    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        accountType: req.body.accountType 
    });

    const userExists = await User.exists({ username: user.username }) 

    if (userExists) {
        res.json( {message: "An account with this username already exists"} )
    } else { 
        user.save((err, user) => {
        if(err) return console.err(err);
        res.json({message: "Account was successfully made"})
    })}
    
});

router.post('/login', async (req, res) => {
    const user = await User.find({ username: req.body.username })
    const userExists = await User.exists({ username: req.body.username })
    
    
    if(userExists) {
        const correctPassword = await bcrypt.compare(req.body.password, user[0].password)
        if(correctPassword) {
            const token = generateAcessToken(user[0].username);
            res.json({ token: token, username: user[0].username })
        } else {
            res.json({ message: "Password is incorrect" })
        }
    } else {
        res.json({ message: "User not found in db"})
    }
})
 
export default router 
