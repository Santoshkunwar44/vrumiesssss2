const Reply = require("../model/Reply")

class ReplyController {

    async createReply(req, res) {
        try {
            let savedReply = await Reply.create(req.body)
            savedReply = await savedReply.populate("user")
            res.status(200).json({ message: savedReply, success: true })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error, success: false })

        }
    }


    async getReplyByPost(req, res) {

        const { postId } = req.params;

        try {
            const reply = await Reply.find({ post: postId }).sort({ vbtUsed: -1 }).populate("user")
            res.status(200).json({ message: reply, success: true })
        } catch (error) {
            res.status(500).json({ message: error, success: false })
        }

    }
    async getReplyByUserId(req, res) {
        const { userId } = req.params;
        try {
            const theReplyQuotes = await Reply.find({
                user: userId
            }).populate("user")
            res.status(200).json({ message: theReplyQuotes })
        } catch (error) {
            res.status(500).json({ message: error, success: false })
        }
    }

}
module.exports = new ReplyController()

