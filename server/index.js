// Import dependecies
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';

//Start app
const app = express();

// Import Routes
import questions from './routes/questionsRoutes.js';
import feed from './routes/feedRoutes.js';
import loginScreen from './routes/loginRoutes.js';
import profile from './routes/profileRoutes.js';
import follow from './routes/followingRoutes.js';

// Load Config
dotenv.config({ path: './config/config.env' });

// Set Port 
const PORT = process.env.PORT || 3000;

// Connect to DB and check connection
mongoose.connect(`${process.env.MONGO_URI}`);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connection Successful!");
});
// Solve CORS problem, this is probably a temporary fix because I don't see how this could scale
app.use(cors({
    origin: 'http://localhost:3000' 
}));

// Set body parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Set routes
app.use('/questions', questions); 
app.use('/feed', feed);
app.use('/loginScreen', loginScreen);
app.use('/profile', profile);
app.use('/follow', follow); 

// Start server
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
}); 


