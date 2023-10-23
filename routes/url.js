const express = require('express');
const {handleGenerateNewShortUrl}= require('../controllers/url');

const router = express.Router();


router.post('/addurl', handleGenerateNewShortUrl);



module.exports = router;