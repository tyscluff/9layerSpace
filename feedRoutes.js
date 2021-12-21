import express from 'express';
import mongoose from 'mongoose';
import Question from '../schemas/questionSchema.js';
import User from '../schemas/userSchema.js';

const router = express.Router();

router.get('/', async (req, res) => {
    let username = req.query.username;
    const user = await User.find({ username: username});

    const followingArray = user[0].following;
    
    const questionsToSend = [];
    
    for(let i = 0; i < followingArray.length; i++) {
        let getQuestion = async (askedTo) => {
            let newQuestion = await Question.find({ askedTo: askedTo });
            
            return newQuestion
        }
        let questions = await getQuestion(followingArray[i]);
        for(let j = 0; j < questions.length; j++) {
            questionsToSend.push(questions[j]);
        }
    }
 
    res.send(questionsToSend);
}); 

router.post('/', (req, res) => {
    res.send({
        question: req.body.question,
        sentTo: req.body.sentTo,
        submittedBy: req.body.submittedBy
    }) 
})

router.post('/ask', async (req, res) => {
    const askedToExists = await User.exists({ username: req.body.askedTo });
    
    if(askedToExists) {
        const question = new Question({
            author: req.body.author,
            body: req.body.body,
            askedTo: req.body.askedTo
        });
        question.save((err, question) => {
            if(err) return console.err(err);
            res.json({ message: "You're question was asked!" });
        })
    } else {
        res.json({ message: "The user you would like to communicate with doesn't exist"});
    }
});

router.put('/upvote', async (req, res) => {
    const question = await Question.findById(req.body.id);
    let newUpvotes = question.meta.upvotes + 1;
    Question.findByIdAndUpdate({_id: req.body.id}, {meta: {upvotes: newUpvotes}}, function(err, result) {
        if(err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
})

router.put('/downvote', async (req, res) => {
    const question = await Question.findById(req.body.id);
    let newUpvotes = question.meta.upvotes - 1;
    Question.findByIdAndUpdate({_id: req.body.id}, {meta: {upvotes: newUpvotes}}, function(err, result) {
        if(err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
})

export default router