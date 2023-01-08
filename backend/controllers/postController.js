const Post = require("../model/Post")
const User = require("../model/User")

class PostController {


    async addNewPost(req, res) {

        try {
            const savedPost = await Post.create(req.body)
            res.status(200).json({ message: savedPost, success: true })

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error, success: false })

        }





    }

    async getAllPost(req, res) {



        res.json({
            message: "HERE ARE ALL THE POST THAT YOU NEED",
            success: false
        })
    }
    async getPostByCategory(req, res) {
        let { catName } = req.params

        if (catName.includes("&&")) {
            catName = catName.replaceAll("&&", "/")
        }
        try {
            const thePosts = await Post.find({ category: catName }).sort({ VBTused: -1 }).populate("owner")
            return res.status(200).json({ message: thePosts, success: true })

        } catch (error) {
            return res.status(500).json({ message: error, success: false })
        }

    }

    async getPostById(req, res) {

        const { id } = req.params;
        if (!id) return
        try {
            const thePosts = await Post.findById(id).populate("owner")
            return res.status(200).json({ message: thePosts, success: true })
        } catch (error) {
            return res.status(500).json({ message: error, success: false })
        }
    }
    async updatePost(req, res) {

        const { postId } = req.params;


        if (!postId) return
        try {
            const savedPost = await Post.findByIdAndUpdate(postId, {
                $set: req.body
            }, {
                new: true
            })



            return res.status(200).json({ message: savedPost, success: true })
        } catch (error) {
            return res.status(500).json({ message: error, success: false })
        }
    }

    async getPostByUserId(req, res) {

        const { userId } = req.params;
        try {
            const thepost = await Post.find({
                owner: userId
            }).populate("owner")

            return res.status(200).json({ message: thepost, success: true })

        } catch (error) {

            return res.status(500).json({ message: error, success: false })

        }


    }
}
module.exports = new PostController()

