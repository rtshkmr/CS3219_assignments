// Import the dependencies for testing
var chai = require("chai")
var chaiHttp = require("chai-http")
var app = require('../server'); // Configure chai
const start = require("../server").start;
const service = require("../server");
chai.use(chaiHttp);
chai.should()


const payload = {
    name: "xoxo",
    quote: "whaddup I is quote"
}
const put_payload = {
   name: "xoxo"
}

const updatedPayload = {
    name: "xoxo",
    quote: "whaddup I is quote updated"
}

before( (done) => {
    console.log("before setup=====")
    service.on("ready", () => {
        done()
    })
})

describe("Quotes", () => {
    describe('[READ]: Get /', function () {
        // Test to get all students record
        it("should get all quotes record", (done) => {
            chai.request(app)
                .get('/api')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.an('object');
                    res.body.should.have.keys("quotes");
                    done();
                });
        })
    })
    describe("[CREATE] Post/", function () {
        it("should post a new quote", (done) => {
            chai.request(app)
                .post('/api/quotes')
                .set("content-type", "application/json")
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.keys("name", "quote", "_id");
                    done();
                });
        })
    })

    describe("[UPDATE] Put/", function () {
        it("should update a quote by a specific name", (done) => {
            chai.request(app)
                .put('/api/quotes')
                .set("content-type", "application/json")
                .send(put_payload)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.keys("body", "message");
                    done();
                });
        })
    })
    describe("[DELETE] Delete/", function() {
        it("should delete the most recent quote by that name", (done => {
            chai.request(app)
                .delete('/api/quotes')
                .set("content-type", "application/json")
                .send(put_payload)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.keys("body", "message");
                    done();
                });
        }))
    })
})
