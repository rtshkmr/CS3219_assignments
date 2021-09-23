console.log("Heyya Ritesh, it's been the longest year ever, hasn't it")
const express = require('express');
const bodyParser = require("body-parser")
const {response, request} = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient
require('dotenv').config();

app.listen(3000, function () {
    console.log('listening on 3000')
})


const dbName = "test"
const pass = process.env.MONGODB_PASS
const usr = process.env.MONGODB_USR
const dbUri = "mongodb+srv://" + usr + ":" + pass + "@cluster0.bpnwe.mongodb.net/"
    + dbName + "?retryWrites=true&w=majority"
const collectionName = "quotes"

MongoClient.connect(dbUri, {useUnifiedTopology: true})
    .then(client => {
        console.log("connected to db")
        const db = client.db(dbName)
        const quotesCollection = db.collection(collectionName)
        useMiddleWareHandler()

        app.set('view engine', 'ejs')
        // get endpoint:
        app.get('/', (req, res) => {
            db.collection("quotes").find().toArray()
                .then(results => {
                    res.render('index.ejs', {quotes: results}) // the view needs to be within a views folder
                    console.log(results)
                })
                .catch(error => console.error(error))
        })

        app.get("/api", (request, response) => {
            db.collection("quotes").find().toArray()
                .then(results => {
                    response.json({quotes: results})
                    // res.render('index.ejs', {quotes: results}) // the view needs to be within a views folder
                    // console.log(results)
                })
                .catch(error => console.error(error))
        })


        // via api endpoint:
        app.use(bodyParser.json())
        app.post('/api/quotes', (req, res) => {
            console.log('json post request!')
            console.log("he\'re\'s the request body: \n");
            console.log(req.body);
            quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.json(req.body)
                })
                .catch(error => console.error(error))
        })

        // via form:
        app.post('/quotes', (req, res) => {
            console.log('Hellooooooooooooooooo you posted onto quotes!')
            console.log("he\'re\'s the request body: \n");
            console.log(req.body);
            quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.redirect("/")
                })
                .catch(error => console.error(error))
        })

        // via api endpoint:
        app.put('/api/quotes', (req, res) => {
            console.log(req.body)
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
                        console.log(result)
                        res.json({
                            message: "success",
                            body: result
                        })
                    }
                )
                .catch(error => console.error(error))
        })

        app.put('/quotes', (req, res) => {
            console.log(req.body)
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
                        console.log(result)
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
                            message: "deleted Troll's quote",
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

const useMiddleWareHandler = () => {
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(express.static('public'))
}

const handleListener = (port, callback) => {
    app.listen(port, callback);
}
