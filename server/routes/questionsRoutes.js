import Question from '../schemas/questionSchema.js';
import mongoose from 'mongoose';
import express from 'express';

const app = express();

const router = express.Router();
 
router.get('/', (req, res) => {
   let askedTo = req.query.username;
   const query = Question.find({ askedTo: askedTo });
   query.select('body author meta.upvotes response.hasResponse response.body');
   query.sort({ "meta.upvotes" : "descending" })
   query.exec((err, questions) => {
       if (err) return console.err(err);
       res.json(questions)
   })
}); 

router.post('/', (req, res) => { 
    const newQuestion = new Question({ 
        body: req.body.body,
        author: req.body.author, 
        askedTo: req.body.askedTo,
    });
    newQuestion.save(function(err, question) {
        if(err) return console.error(err);
        res.send("Success")
    }) 
})

router.put('/response', (req, res) => {

    Question.findByIdAndUpdate({_id: req.body.id}, 
        { response: { hasResponse: req.body.hasResponse, public: true, body: req.body.body } }, 
        function(err, result) {
            if (err) {
                res.send(err) 
            } else {
                res.send(result)
            }
        })

})

router.put('/likeQuestion', (req, res) => {
    Question.findByIdAndUpdate({_id: req.body.id},
        { response: {liked: req.body.liked }})
})
 
export default router 
