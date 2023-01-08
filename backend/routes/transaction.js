const transactionController = require("../controllers/transactionController")

const router = require("express").Router()

router.post("/", transactionController.addTransaction)
router.get("/inspect", transactionController.getTransactionAsInpection)
router.put("/:transactionId", transactionController.updateTransaction)
router.post("/buytokens", transactionController.buyTokens)
module.exports = router  