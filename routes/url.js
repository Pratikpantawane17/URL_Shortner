const express = require("express");
const router = express.Router();
const { handleGenerateShortURL, handleRedirectNewURL, handleAnalyticsURL } = require('../controllers/url');
const URL = require('../models/url');

router.post('/', handleGenerateShortURL);

router.get('/:shortID', handleRedirectNewURL);

router.get('/analytics/:shortID', handleAnalyticsURL);


module.exports = router;


