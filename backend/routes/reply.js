const replyController = require("../controllers/replyController")
const router = require("express").Router()


router.post("/", replyController.createReply)
router.get("/:postId/bypost", replyController.getReplyByPost)

router.get("/:userId/byuser", replyController.getReplyByUserId)
module.exports = router;