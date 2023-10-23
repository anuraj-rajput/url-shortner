const express = require("express")
const urlRoute = require("./routes/url")
const connectToMongoDb = require("./connection")
const URL =require("./models/url")
const shortid = require("shortid")
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");

const urlapp = express()
const Port = 7000

urlapp.set('view engine', 'ejs');
urlapp.set('views', path.resolve('./views'))

urlapp.use(express.json());
urlapp.use(express.urlencoded({ extended: false }));


connectToMongoDb("mongodb+srv://rajputanuraj1:rajputanuraj1@urlshortner.bfgmulc.mongodb.net/?retryWrites=true&w=majority")
    .then(()=>console.log("mongodb connection successful"))

urlapp.get('/:requrl', async (req, res) => {
    const short = req.params.requrl;
        // console.log(short);
    const result = await URL.findOne({ shortId: short })
    console.log(result)
    // const forward = await URL.findById({ shortUrl: "short"})
    return await res.redirect(result.redirectUrl)
})

urlapp.use('/url', urlRoute)

urlapp.use('/', (req, res) => { 
        return res.render('home', {
    })
})

// urlapp.get('/res/:requrl', async (req, res) => {
//     try {
//         const short = req.params.requrl;
//         const entry = await URL.findOneAndUpdate(
//             { short },
//             {
//                 $push: {
//                     totalClicks: { timestamp: Date.now() },
//                 },
//             }
//         );
//         console.log(entry.redirectUrl)

//         if (!entry || !entry.redirectUrl) {
//             // Handle the case where no matching document is found or redirectUrl is missing
//             return res.status(404).json({ error: 'Short URL not found' });
//         }

//         return res.redirect(entry.redirectUrl);
//     } catch (error) {
//         console.error('Error while processing short URL:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// });



urlapp.listen(Port, () => { console.log("listening on port 7000 ...") })