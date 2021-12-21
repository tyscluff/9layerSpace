import mongoose from 'mongoose';

const { Schema } = mongoose;

const fanSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    following: Array,
    favoriteTeam: String,
    askedQuestions: Array,
    isPaying: Boolean,
    isBlocked: Boolean,
    blockedQuestions: Boolean
});

var Fan = mongoose.model()

