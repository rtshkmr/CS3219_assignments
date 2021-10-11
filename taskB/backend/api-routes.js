const router = require("express").Router();
const controller = require("./controller");

router.get("/", function (req, res) {
    res.json({
        status: "Successsss finally",
        message: "This is my message",
    });
});

router.route("/notes")
    .get(controller.index)
    .post(controller.create);

router
    .route("/notes/:note_id")
    .get(controller.read)
    .patch(controller.update)
    .put(controller.update)
    .delete(controller.delete);

module.exports = router;
