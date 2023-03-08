const ContentModel = require("../../model/ContentModel");

class ContentService {
    async likeContent(userId, contentId) {
        try {
            const updatedContent = await ContentModel.findByIdAndUpdate(contentId, {
                $push: { likes: userId },

            },
                {
                    new: true,
                    returnOriginal: false
                })
            return updatedContent;
        } catch (error) {
            return error
        }

    }
    async disLikeContent(userId, contentId) {
        try {
            const updatedContent = await ContentModel.findByIdAndUpdate(contentId, {
                $push: { dislikes: userId }

            },
                {
                    new: true,
                    returnOriginal: false
                })
            return updatedContent;
        } catch (error) {
            return error
        }

    }
    async removeDisLikeContent(userId, contentId) {
        try {
            const updatedContent = await ContentModel.findByIdAndUpdate(contentId, {
                $pull: { dislikes: userId }

            },
                {
                    new: true,
                    returnOriginal: false
                })
            return updatedContent;
        } catch (error) {
            return error
        }

    }
    async removeLikeContent(userId, contentId) {
        try {
            const updatedContent = await ContentModel.findByIdAndUpdate(contentId, {
                $pull: { likes: userId }

            },
                {
                    new: true,
                    returnOriginal: false
                })
            return updatedContent;
        } catch (error) {
            return error
        }

    }
}
module.exports = new ContentService()
