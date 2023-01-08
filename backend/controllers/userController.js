const User = require("../model/User");

class UserController {

    async addNewUser(req, res) {
        try {
            const savedUser = await User.create(req.body)
            res.status(200).json({ message: savedUser, success: true })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error, success: false })
        }
    }

    async getUsers(req, res) {
        try {
            const theUsers = await User.find({})
            res.status(200).json({ message: theUsers, success: true })

        } catch (error) {

            console.log(error)
            res.status(500).json({ message: error, success: false })

        }
    }

    async getUserById(req, res) {

        const { userId } = req.params



        try {
            const theUsers = await User.findById(userId)
            res.status(200).json({ message: theUsers, success: true })

        } catch (error) {

            console.log(error)
            res.status(500).json({ message: error, success: false })

        }
    }


    async updateUser(req, res) {
        const { userId } = req.params;
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, {
                $set: req.body
            }, {
                new: true,
            })
            res.status(200).json({ message: updatedUser, success: true })
        } catch (error) {
            res.status(500).json({ message: error, success: false })
        }
    }

    async deleteUser(req, res) {
        const { userId } = req.params;
        try {
            await User.findByIdAndDelete(userId)
            res.status(200).json({ message: "User deleted successfully", success: true })
        } catch (error) {
            res.status(500).json({ message: error, success: false })
        }
    }
}
module.exports = new UserController()

