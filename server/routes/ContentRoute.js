const contentController = require("../controllers/contentController")

const router = require("express").Router()

router.post("/", contentController.addContent)
router.get("/", contentController.getContent);
router.post("/comment/:contentId", contentController.addComment)
router.post("/react/:contentId", contentController.reactToContent)
module.exports = router
