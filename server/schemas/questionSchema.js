import mongoose from 'mongoose';

const { Schema } = mongoose;

const questionSchema = new Schema({
    body: { type: String, required: true },
    author: { type: String, required: true },
    askedTo: { type: String, required: true} ,
    date: { type: Date, default: Date.now },
    meta: {
        upvotes: { type: Number, default: 0},
        isBlocked: { type: Boolean, default: false},
    },
    response: {
        hasResponse: { type: Boolean, default: false},
        body: String,
        public: { type: Boolean, default: true },
        liked: { type: Boolean, default: false}
    }
});

var Question = mongoose.model('Question', questionSchema, 'questions');

export default Question;  
