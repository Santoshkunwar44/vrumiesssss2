const userController = require("../controllers/userController")

const router = require("express").Router()

router.get("/all", userController.getUsers)
router.get("/:userId", userController.getUserById)
router.post("/", userController.addNewUser)
router.put("/:userId", userController.updateUser)
router.delete("/:userId", userController.deleteUser)


module.exports = router