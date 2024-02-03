const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const db = require('./Middlewares/db');
const preAuth = require('./Routes/preAuth');
const postAuth = require('./Routes/postAuth');
const TokenAuth = require('./Controllers/TokenAuth');
const cors = require("cors");
const video = require('./Routes/video');
const PORT = 3001;
const logger = require("morgan");

const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true,
} 

app.use(logger("dev"));
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
app.use(express.json());
app.use(cookieParser());

app.use("/pre",preAuth);
app.use("/video",video);
app.use("/post",TokenAuth,postAuth);

app.get("/",(req,res)=>{
    res.send("Welcome to InstraktorLMS-BE");
})

db.connectToDB();

app.listen(PORT,()=>{
    console.log(`>>Server Listening on Port ${PORT}`);
})
