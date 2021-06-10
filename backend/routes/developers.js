'use strict';

/* Define and load Modules */
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

/* Include Models & Schemas */
import Developers from '../models/developers.js';

/* Load Functions, Locales and Config Files */
import MyFunctions from '../includes/functions.js';
import Config from '../includes/config.js';
import Assets from '../models/assets.js';

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

router.get('/fetchAllDevelopers', validateToken, async (req, res) => {

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

router.post('/createDeveloper', validateToken, async (req, res) => {

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
}),

router.post('/addAssetToDeveloper',  validateToken, async (req, res) => {

	try {

		const { developerId, assetId } = req.body;

		if (!developerId || !assetId) {
			return res.status(200).json({
				Response: true,
				Message: 'Developer Id and Asset Id are required.'
			});
		}

		const fetchedAsset = await Assets.findOne({ id: assetId });
		const fetchedDeveloper = await Developers.findOne({ id: developerId });

		if (!fetchedAsset) {
			return res.status(200).json({
				Response: false,
				Message: `Asset doesn't exist`,
			});
		}

		if (!fetchedDeveloper) {
			return res.status(200).json({
				Response: false,
				Message: `Developer doesn't exist`,
			});
		}

		const newVal = {
			$push : {
				assetsId: assetId
			}
		}

		const savedNewStatus = await Developers.updateOne({ id: developerId }, newVal);
		console.log(savedNewStatus)
		/* Clean their assignments */
		/* Pendient */

		return res.status(200).json({
			Response: true,
			Message: `Added asset succesfull`,
		});

	} catch(e){
		console.log(e);
	}

})

router.put('/changeStatus',  validateToken, async (req, res) => {

	try {

		const { id, status } = req.body;

		if (!id || !status ) {
			return res.status(200).json({
				Response: false,
				Message: 'Id and status are required.'
			});
		}

		const fetchedDeveloper = await Developers.findOne({ id });

		const newVal = {
			$set : {
				active: status
			}
		}

		const savedNewStatus = await Developers.updateOne({ id }, newVal);

		/* Clean their assignments */
		/* Pendient */

		return res.status(200).json({
			Response: true,
			Message: `Developer ${fetchedDeveloper.fullname}, active: ${status}`,
		});

	} catch(e){
		console.log(e);
	}

})

/* Export this Module */
export default router;
