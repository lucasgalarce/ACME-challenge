'use strict';

/* Define and load Modules */
import express from 'express';
import axios from 'axios';
import fs from 'fs';

/* Include Models & Schemas */
import Assets from '../models/assets.js';
// import Licenses from '../models/licenses.js';


const CreateAssetsAndLicenses = async () => {

    /* Import JSON File */
    const rawdata = fs.readFileSync('./includes/fixtures.json');
    const fixturesJSON = JSON.parse(rawdata);

    console.log(fixturesJSON)
}

export default CreateAssetsAndLicenses;
