const shortid = require('shortid');
const URL = require('../models/url');
const jwt = require('jsonwebtoken')



async function handleGenerateNewShortUrl(req, res) {
    const shortID = shortid(8);
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error :"url not specified and is required"})
    }
    const newURL = await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
         })
    return res.status(201).json({id: shortID ,status : "id created"})
}


module.exports = {
    handleGenerateNewShortUrl
}