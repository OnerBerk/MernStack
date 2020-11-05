const express = require('express');
const router = express.Router();

//import les controllers jobs
const {getJobs, newJob} = require('../controller/jobsController')


router.route('/jobs').get(getJobs);
router.route('/jobs/new').post(newJob);


module.exports =router;