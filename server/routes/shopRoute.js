const { getShopItem, addShopItem, deleteShopItem } = require("../controllers/ShopController")

const router = require("express").Router()

router.post("/", addShopItem)
router.get("/", getShopItem)
router.delete("/:itemId", deleteShopItem)

module.exports = router 