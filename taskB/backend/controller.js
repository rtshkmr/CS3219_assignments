const Note = require("./note");
const mongoose = require("mongoose");


exports.index = async function (req, res) {
    Note.get(function (err, notes) {
        if (err) {
            res.status(500).json(error);
        } else {
            res.json({
                status: "success",
                message: "Notes retrieved successfully",
                data: notes,
            });
        }
    });
};

// Handle create note actions
exports.create = function (req, res) {
    var note = new Note();
    note.title = req.body.title;
    note.description = req.body.description;

    if (!note.title || !note.description) {
        res.status(400).send("Require non null fields: Title and Description");
        return;
    }

    note.save(function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                message: "Created a new note!!",
                data: note,
            });
        }
    });
};

// Handle read note info
exports.read = function (req, res) {
    const note_id = req.params.note_id;
    if (!mongoose.isValidObjectId(note_id)) {
        res.status(400).send("Invalid id");
        return;
    }

    Note.findById(note_id, function (err, note) {
        if (err) {
            res.status(500).send(err);
        } else if (!note) {
            res.status(404).send("Note not found");
        } else {
            res.json(note);
        }
    });
};

// Handle update note info
exports.update = function (req, res) {
    const note_id = req.params.note_id;
    if (!mongoose.isValidObjectId(note_id)) {
        res.status(400).send("Invalid note id");
        return;
    }

    Note.findById(note_id, function (err, note) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        if (!note) {
            res.status(404).send("Note not found");
            return;
        }

        note.title = req.body.title || note.title;
        note.description = req.body.description || note.description;

        note.save(function (err) {
            if (err) {
                res.status().send(err);
            } else {
                res.json({
                    message: "Note got updated",
                    data: note,
                });
            }
        });
    });
};

// delete notes
exports.delete = function (req, res) {
    const note_id = req.params.note_id;
    if (!mongoose.isValidObjectId(note_id)) {
        res.status(400).send("Invalid note id");
        return;
    }

    Note.deleteOne(
        {
            _id: mongoose.Types.ObjectId(note_id),
        },
        function (err, note) {
            if (err) {
                res.status(500).send(err);
            } else if (note.deletedCount == 0) {
                res.status(404).send("Cant' find note via note id");
            } else {
                res.json({
                    status: "success",
                    message: `Note ${note_id} deleted`,
                });
            }
        }
    );
};
