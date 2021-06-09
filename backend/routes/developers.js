'use strict';

/* Define and load Modules */
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

/* Include Models & Schemas */
import Developers from '../models/developers.js';

/* Load Functions, Locales and Config Files */
import MyFunctions from '../includes/functions.js';

/* Function to Validate Session Token */
const validateToken = (req, res, next) => {

	const sessToken = req.header('sessToken');
	if(!sessToken) return res.status(401).send('Access Denied');

	try {
		const verified = jwt.verify(sessToken, Config.secretToken);
		next();

	} catch(error) {
		res.status(400).send(error);
	}
};

router.get('/fetchAllDevelopers', async (req, res) => {

    try {

        /* Fetch Developers*/
        const fetchedDevelopers = await Developers.find();
        
		/* Send response OK */
		res.status(200).json({
			Response : true,
			fetchedDevelopers
        });
        
    } catch (err) {

		/* Send response FALSE */
		res.status(200).json({
			Response : false,
			Message: `${err}`
        });
    }
}),

router.post('/createDeveloper', async (req, res) => {

    try {
        const payload = req.body;
        
        /* Generate Unique Id */
        const developerId = MyFunctions.generateUniqueID();

        const newDeveloper = new Developers({
            id: developerId,
            fullname: payload.fullname,
        });

        const saveDeveloper = await newDeveloper.save();

        /* Return TRUE */
		res.status(200).json({
			Response     : true,
			Message      : 'Developer created.',
			newDeveloper,
		});
    } catch (err) {

		/* Send response FALSE */
		res.status(200).json({
			Response : false,
			Message: `${err}`
        });
    }
})

/* Export this Module */
export default router;
