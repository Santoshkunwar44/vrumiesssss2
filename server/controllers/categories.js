const category = require("../model/category")

class categoryController {


    async addNewCateogry(req, res) {



        try {
            const savedCategory = await category.create(req.body)
            res.cookie("refreshToken", "this is refresh token", {
                maxAge: 1000 * 60 * 60 * 24 * 30 * 12 * 2,
                secure: true,
                httpOnly: true,
                sameSite: "None"
            })
            res.status(200).json({ message: savedCategory, success: true })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error, success: false })
        }
    }

    async getAllCategory(req, res) {
        try {
            const categoryList = await category.find({})
            return res.status(200).json({ message: categoryList, success: true })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: error, success: false })
        }


    }



}
module.exports = new categoryController()

