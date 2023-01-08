const postController = require("../controllers/postController")

const router = require("express").Router()


router.get("/:catName", postController.getPostByCategory)
router.get("/:id/byId", postController.getPostById)
router.post("/", postController.addNewPost)
router.put("/:postId", postController.updatePost)
router.get("/:userId/byUserId", postController.getPostByUserId)

module.exports = router