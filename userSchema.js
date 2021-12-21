import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, max: 650},
    username: { type: String, required: true, max: 30},
    password: { type: String, required: true, min: 10, max: 50},
    accountType: { type: String, required: true },
    following: { type: Array, default: [] }
})

var User = mongoose.model('User', userSchema, 'users');

export default User  