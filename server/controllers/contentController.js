const { update } = require("../model/ContentModel");
const ContentModel = require("../model/ContentModel");
const ContentService = require("../services/authService/ContentService");

class ContentController {
    async addContent(req, res) {
        try {
            const savedContent = await ContentModel.create(req.body)
            res.status(200).json({ message: savedContent, success: true })
        } catch (error) {
            res.status(500).json({ message: error.message, success: false })
        }

    }
    async getContent(req, res) {
        const reqQuery = req.query;
        let searchQueries = {}

        if (reqQuery.userId) {
            searchQueries.owner = reqQuery.userId
        } else if (reqQuery.contentId) {
            searchQueries._id = reqQuery.contentId
        } else if (reqQuery.contentType) {
            searchQueries.contentType = reqQuery.contentType
        }




        try {
            let theContent = await ContentModel.find(searchQueries).populate(["owner", "comments.user"])
            console.log(theContent)
            if (reqQuery.categorize) {
                theContent = theContent.reduce((acc, content) => {

                    if (Object.keys(acc).includes(content.contentType)) {
                        acc[content.contentType].push(content)
                    } else {
                        acc[content.contentType] = [content]
                    }
                    return acc
                }, {})
                // theContent
            }
            res.status(200).json({ message: theContent, success: true })
        } catch (error) {
            res.status(500).json({ message: error.message, success: false })
        }

    }

    async addComment(req, res) {
        const { contentId } = req.params
        const { text, userId } = req.body


        try {
            let savedContent;
            const Content = await ContentModel.findById(contentId)
            const hasCommented = Content.comments.find((item) => item.user == userId)
            if (!hasCommented) {
                savedContent = await ContentModel.findOneAndUpdate(
                    { _id: contentId },
                    { $push: { comments: { user: userId, text } } },
                    { returnOriginal: false }
                )
            } else {


                savedContent = await ContentModel.findOneAndUpdate(
                    { _id: contentId },
                    { $set: { "comments.$[element].text": text } },
                    {
                        arrayFilters: [
                            { "element.user": userId }
                        ],
                        returnOriginal: false,

                    }
                )
            }

            return res.status(200).json({ message: savedContent, success: true })
        } catch (error) {
            return res.status(500).json({ message: error.message, success: false })

        }
    }

    async reactToContent(req, res) {
        const { like, dislike } = req.query;
        const { contentId } = req.params;
        let updated;
        try {

            if (like) {
                const content = await ContentModel.findById(contentId)
                const isLiked = content.likes.includes(like);
                if (isLiked) {
                    res.status(403).json({ message: "You have already liked the content", success: false })
                } else {

                    const hasDisliked = content.dislikes.includes(like)
                    if (hasDisliked) {
                        await ContentService.removeDisLikeContent(like, contentId)
                        updated = await ContentService.likeContent(like, contentId)
                    } else {
                        updated = await ContentService.likeContent(like, contentId)
                    }
                    return res.status(200).json({ message: updated, success: true })



                }
            } else if (dislike) {
                const content = await ContentModel.findById(contentId)
                const isDisliked = content.dislikes.includes(dislike);
                if (isDisliked) {
                    res.status(403).json({ message: "You have already disliked the content", success: false })
                } else {

                    const hasLiked = content.likes.includes(dislike)
                    if (hasLiked) {
                        await ContentService.removeLikeContent(dislike, contentId)
                        updated = await ContentService.disLikeContent(dislike, contentId)
                    } else {
                        updated = await ContentService.disLikeContent(dislike, contentId)
                    }
                    return res.status(200).json({ message: updated, success: true })

                }
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message, success: false })
        }
    }

}
module.exports = new ContentController()

