const ShopModel = require("../model/ShopModel");

class ShopController {
    async addShopItem(req, res) {
        try {
            let savedShopItem = await ShopModel.create(req.body)
            savedShopItem = await savedShopItem.populate("owner")
            res.status(200).json({ message: savedShopItem, success: true })

        } catch (error) {
            res.status(500).json({ message: error.message, success: false })
        }
    }
    async getShopItem(req, res) {


        let searchQuery = {}

        Object.keys(req.query).forEach(key => {

            if (req.query[key]) {
                searchQuery[key] = req.query[key]
            }
        })

        try {
            const savedShopItem = await ShopModel.find(searchQuery)
            res.status(200).json({ message: savedShopItem, success: true })

        } catch (error) {
            res.status(500).json({ message: error.message, success: false })
        }
    }

    async updateShopItem(req, res) {
        try {
            const updatedShopItem = await ShopModel.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                returnOriginal: false,
                new: true
            }).populate("owner")
            res.status(200).json({ message: updatedShopItem, success: true })
        } catch (error) {
            res.status(500).json({ message: error.message, success: false })
        }
    }
    async updateShopItem(req, res) {
        try {
            const updatedShopItem = await ShopModel.findByIdAndUpdate(req.params.itemId, {
                $set: req.body
            }, {
                returnOriginal: false,
                new: true
            })
            res.status(200).json({ message: updatedShopItem, success: true })
        } catch (error) {
            res.status(500).json({ message: error.message, success: false })
        }
    }
    async deleteShopItem(req, res) {
        try {
            await ShopModel.findByIdAndDelete(req.params.itemId);

            res.status(200).json({ message: "successfully Deleted", success: true })
        } catch (error) {
            res.status(500).json({ message: error.message, success: false })
        }
    }

}
module.exports = new ShopController()