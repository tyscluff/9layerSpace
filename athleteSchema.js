import mongoose from 'mongoose';

const { Schema } = mongoose;

const athleteSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    follinwg: Array,
    team: String,
    fans: Array
});
 