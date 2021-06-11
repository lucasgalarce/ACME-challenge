"use strict";

/* Define and load Modules */
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

/* Include Models & Schemas */
import Assets from "../models/assets.js";

/* Load Functions, Locales and Config Files */
import MyFunctions from "../includes/functions.js";
import Config from "../includes/config.js";

/* Function to Validate Session Token */
const validateToken = (req, res, next) => {
	const sessToken = req.header("sessToken");

	if (!sessToken) return res.status(401).send("Access Denied");

	try {
		const verified = jwt.verify(sessToken, Config.secretToken);
		next();
	} catch (error) {
		res.status(400).send(error);
	}
};

router.get("/fetchAssets", validateToken, async (req, res) => {
	try {
		// let { assetsId } = req.body;
		// console.log(assetsId)
		// console.log(typeof(assetsId))
		// assetsId = JSON.stringify(assetsId)
		// console.log(typeof(assetsId))
		// const test = ['aat1']
		/* Fetch Developers*/
		const fetchedAssets = await Assets.find({ id: ["aat1", "aat2"] });

		// console.log(fetchedAssets)
		/* Send response OK */
		res.status(200).json({
			Response: true,
			fetchedAssets,
		});
	} catch (err) {
		/* Send response FALSE */
		res.status(200).json({
			Response: false,
			Message: `${err}`,
		});
	}
});

/* Export this Module */
export default router;
