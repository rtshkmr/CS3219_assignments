var createError = require('http-errors');
var axios = require("axios");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors")
const Redis = require("redis")

const TTL = 3600; // 1 hour default TTL
const placeholder_url = "https://jsonplaceholder.typicode.com/photos"
const app = express();
app.use(cors());
const redisClient = Redis.createClient(); // default param redis client, defaults to localhost

// for demo purposes, flush beforehand:
redisClient.flushdb(function (err, success) {
    console.log("Flushing cache at startup" + success);
})

app.get("/", async (req, res) => {
    const key = "photos"
    redisClient.get(key, async (error, photos) => {
        if (error) console.err(error);
        if (photos != null) { // is cache hit
            console.log("# hit")
            return res.json((JSON.parse(photos)));
        } else {// if cache miss:
            console.log("# miss")
            const albumId = req.query.albumId
            const {data} = await axios.get(placeholder_url, {params: {albumId}})
            const serializedData = JSON.stringify(data); // redis only stores serialized strings
            redisClient.setex(key, TTL, serializedData);
            res.json(data)
        }
    })
})

app.listen(3001)
module.exports = app;
