const {connect} = require("../mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const {expect} = require("chai");

chai.should();
chai.use(chaiHttp);

before((done) => {
    connect().then(() => {
        const Note = require("../note");
        Note.deleteMany({}).then(() => {
            done();
        });
    });
});

const setupDummyDb = async () => {
    const Note = require("../note");
    const note = new Note();
    note.title = "myTitle";
    note.description = "myDescription";
    await note.save();
    return note;
};

describe("/GET Notes", () => {
    it("returns empty arr when no notes in db", (done) => {
        chai
            .request(require("../app"))
            .get("/api/notes")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a("array");
                res.body.data.length.should.be.eql(0);
                done();
            });
    });

    it("returns non-empty array when using a prepopulated db", async () => {
        await setupDummyDb();
        chai
            .request(require("../app"))
            .get("/api/notes")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a("array");
                res.body.data.length.should.be.eql(1);
            });
    });
});

describe("/POST Notes", () => {
    it("adds a note successfully", (done) => {
        const note = {
            title: "myPostNoteTest",
            description: "myDescription",
        };

        chai
            .request(require("../app"))
            .post("/api/notes")
            .send(note)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                const note_id = res.body.data._id;
                require("../note").findById(note_id, (err, fetchedNote) => {
                    fetchedNote.title.should.be.eql(note.title);
                    fetchedNote.description.should.be.eql(note.description);
                    done();
                });
            });
    });
});

describe("/DELETE Notes", () => {
    it("Deletes an existing note successfully", async () => {
        const note = await setupDummyDb();
        const id = note.id;
        const _id = note._id;

        chai
            .request(require("../app"))
            .delete(`/api/notes/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                require("../note").findById(_id, (err, fetchedNote) => {
                    expect(fetchedNote).to.be.null;
                });
            });
    });
});

describe("/PUT Notes", () => {
    it("updates note successfully", async () => {
        const defaultNote = await setupDummyDb();
        const id = defaultNote.id;
        const _id = defaultNote._id;

        const note = {
            title: "myTitle",
            description: "myUpdatedDescription",
        };

        chai
            .request(require("../app"))
            .put(`/api/notes/${id}`)
            .send(note)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                require("../note").findById(_id, (err, fetchedNote) => {
                    fetchedNote.title.should.be.eql(note.title);
                    fetchedNote.description.should.be.eql(note.description);
                });
            });
    });
});
