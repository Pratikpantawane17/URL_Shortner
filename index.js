const express = require("express");
const app = express();
const port = 3000;
const { type } = require("os");

const { default: mongoose } = require("mongoose");
const { connectMongoDB } = require('./connection');
const urlRoutes = require('./routes/url');

// Middleware 
app.use(express.urlencoded({encoded: false}));
app.use(express.json());

// connect
connectMongoDB("mongodb://127.0.0.1:27017/url-shortener").then(() => console.log("Connected to MongoDB")).catch((err) => console.log("Error : ", err));

// model

// Routes
app.use('/url', urlRoutes);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})