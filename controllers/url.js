const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateShortURL(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error : "URL is required"});
    const shortID = shortid();

    await URL.create ({
     shortID : shortID,
     redirectURL : body.url,
     visitHistory: []
   });

      return res.render("home", {
        shortID : shortID,
      })

//    return res.json({shortID : shortID});
}

async function handleRedirectNewURL(req, res) {
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate({
        shortID,
    },
    {  
        $push : {
            visitHistory: {
                timestamp: Date.now()
            }
        },
    }
    );

    if(!entry || !entry.redirectURL) return res.status(404).json({error : "URL not Found"});

    return res.redirect(entry.redirectURL);
}

async function handleAnalyticsURL(req, res) {
    const shortID = req.params.shortID;
    const url = await URL.findOne({shortID});
    if(!url) return res.status(400).json({error: "URL not found"});
    
    return res.json({
        totalCLicks: url.visitHistory.length,
        Analytics: url.visitHistory
    });
}



module.exports = {
    handleGenerateShortURL,
    handleRedirectNewURL,
    handleAnalyticsURL,
}