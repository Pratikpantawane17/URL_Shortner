const express = require("express");
const app = express();
const port = 3000;
const { type } = require("os");

const { default: mongoose } = require("mongoose");
const { connectMongoDB } = require('./connection');
const urlRoutes = require('./routes/url');
const staticRoute = require('./routes/staticRoute');
const URL = require('./models/url');
const path = require("path");

// Middleware 
app.use(express.urlencoded({encoded: false}));
app.use(express.json());

// connect
connectMongoDB("mongodb://127.0.0.1:27017/url-shortener").then(() => console.log("Connected to MongoDB")).catch((err) => console.log("Error : ", err));

// setting views 
app.set("view engine", "ejs");   // Tailing the express that we are using the ejs view engine....
app.set("views", path.resolve("./views"));   // Telling that all the views are present at views folder


// model

// Routes

// Server Side Rendering : It becomes very painful in order to write the client site whole code at our server
// app.get('/test', async (req, res) => {
//     const allUrls = await URL.find({});
//     const html = `
//         <html>
//             <head>
//                 <body>
//                   <ol>
//                     ${allUrls.map(url => {
//                         return `<li>${url.shortID} - ${url.redirectURL} : TotalClicks : ${entry.visitHistory.length}</li>`
//                     }).join("")}
//                   </ol>
//                 </body>
//             </head>
//         </html>
//     `;

//     res.send(html);
// });

// OR 
// app.get('/test', (req, res) => {
//     res.send("<h1>Hey There SSR !</h1>");
// });

// app.get('/test', async (req, res) => {
//     const allUrls = await URL.find({});
//     return res.render("home", {
//         urls: allUrls,
//     });
// })

app.use('/', staticRoute);    // CLient Side Routes
app.use('/url', urlRoutes);   // Server Side Routes







app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})