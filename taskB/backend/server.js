console.log("Heyya Ritesh, it's been the longest year ever, hasn't it")
const serverless = require("serverless-http")
const express = require('express');
const bodyParser = require("body-parser")
require('dotenv').config();
const {response, request} = require("express");
const app = express();
let port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient



const dbName = "test"
const pass = process.env.MONGODB_PASS
const usr = process.env.MONGODB_USR
const dbUri = "mongodb+srv://" + usr + ":" + pass + "@cluster0.bpnwe.mongodb.net/"
    + dbName + "?retryWrites=true&w=majority"
const collectionName = "quotes";


let server

start().then(r => console.log("connection established"));

function stop() {
    server.close()
}

async function start() {
    console.log(".......starting mongodb connection")
    MongoClient.connect(dbUri, {useUnifiedTopology: true})
        .then(client => {
            console.log("connected to db")
            const db = client.db(dbName)
            const quotesCollection = db.collection(collectionName)
            app.use(bodyParser.urlencoded({extended: true}))
            app.use(express.static('public'))

            server = app.listen(port, function () {
                console.log(`listening on port ${port}`)
                app.emit("ready") // to wait for
            })

            app.set('view engine', 'ejs')
            // get endpoint:
            app.get('/', (req, res) => {
                db.collection("quotes").find().toArray()
                    .then(results => {
                        res.render('index.ejs', {quotes: results}) // the view needs to be within a views folder
                    })
                    .catch(error => console.error(error))
            })

            app.get("/api", (request, response) => {
                db.collection("quotes").find().toArray()
                    .then(results => {
                        response.json({quotes: results})
                    })
                    .catch(error => console.error(error))
            })


            // via api endpoint:
            app.use(bodyParser.json())
            app.post('/api/quotes', (req, res) => {
                quotesCollection.insertOne(req.body)
                    .then(result => {
                        res.json(req.body)
                    })
                    .catch(error => console.error(error))
            })

            // via form:
            app.post('/quotes', (req, res) => {
                quotesCollection.insertOne(req.body)
                    .then(result => {
                        res.redirect("/")
                    })
                    .catch(error => console.error(error))
            })

            // via api endpoint:
            app.put('/api/quotes', (req, res) => {
                quotesCollection.findOneAndUpdate(
                    {name: req.body.targetname},
                    {
                        $set: {
                            name: req.body.name,
                            quote: req.body.quote
                        }
                    },
                    {
                        upsert: true
                    })
                    .then(result => {
                            console.log("inserted...")
                            res.json({
                                message: "success",
                                body: result
                            })
                        }
                    )
                    .catch(error => console.error(error))
            })

            app.put('/quotes', (req, res) => {
                quotesCollection.findOneAndUpdate(
                    {name: "ritesh"},
                    {
                        $set: {
                            name: req.body.name,
                            quote: req.body.quote
                        }
                    },
                    {
                        upsert: true
                    })
                    .then(result => {
                            console.log("inserted...")
                            res.json("success")
                        }
                    )
                    .catch(error => console.error(error))
            })

            //api:
            app.delete("/api/quotes", (req, res) => {
                quotesCollection.deleteOne(
                    {name: req.body.name})
                    .then(result => {
                        if (result.deletedCount === 0) {
                            return res.json({message: "no quote to delete"})
                        }
                        res.json(
                            {
                                message: `deleted ${req.body.name}'s quote`,
                                body: result
                            }
                        )
                    })
                    .catch(error => console.error(error))
            })


            app.delete("/quotes", (req, res) => {
                quotesCollection.deleteOne(
                    {name: req.body.name})
                    .then(result => {
                        if (result.deletedCount === 0) {
                            return res.json("no quote to delete")
                        }
                        res.json("deleted Troll's quote")
                    })
                    .catch(error => console.error(error))
            })

        })
        .catch(error => console.error(error))
}


const awsServerlessExpress = require("aws-serverless-express")
const myServer = awsServerlessExpress.createServer(app)

module.exports = server;
module.exports = app;
module.exports.handler = async function(event, context) {
    console.log("EVENT: \n" + JSON.stringify(event, null, 2))
    console.log("event", event);
    console.log("context", context);
    context.callbackWaitsForEmptyEventLoop = false;
    return awsServerlessExpress.proxy(server, event, context)
    // return event
}
// module.exports.handler = serverless(app);
module.exports.stop = stop;
module.exports.start = start;
