import express from 'express';
import User from '../schemas/userSchema.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const username  = await req.get("username")

    if(username === "") {
        res.json({ message: "You found the problem."})
    } else { 
    const user = await User.find( {username: username })
    
    res.json(user)
    }
});

router.put('/email', async (req, res) => {

    const user = await User.exists({ email: req.body.email });

    if(user) {
        res.json({ message: "That email is already taken. Pick a different one." });
    } else { 
        User.findOneAndUpdate({ username: req.body.username },
        { email: req.body.email}, { new: true}, 
        function (err, result) {
            if(err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    }
});

router.put('/username', async (req, res) => {

    const user = await User.exists({ username: req.body.newUsername });

    if(user) {
        res.json({ message: "This username is already taken. Pick a different one." })
    } else {
        User.findOneAndUpdate({ username: req.body.username }, 
        { username: req.body.newUsername }, { new: true },
        function (err, result) {
            if(err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    }
})

export default router;
