'use strict';

/* Include Node.js Modules */
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// import config from './config/config.js';

/* Include Routes */


const PORT = process.env.PORT;

/* Init Express Framework */
const app = express();

/* BodyParser Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Enable CORS */
app.use(cors());

/* Set the PORT and Start Web Server */
app.set('port', (PORT || 3000));
const server = app.listen(app.get('port'), function(){
    console.log('Server: ' + app.get('port'));
});

/* Define Routes */

// MongoDB Connection
mongoose.set('useCreateIndex', true);

try {
    mongoose.connect('mongodb://localhost:27017/acme-challenge', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err, res) => {
        if(err) throw err;
    
        console.log("DB online");
    });  
} catch (err) { 
    console.log(err);    
}