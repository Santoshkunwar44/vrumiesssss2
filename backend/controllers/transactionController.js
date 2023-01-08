const Transactions = require("../model/Transactions");
const User = require("../model/User")

class TransactionController {

    async addTransaction(req, res) {
        try {

            console.log(req.body)


            const savedTransaction = await Transactions.create(req.body)
            res.status(200).json({ message: savedTransaction, success: true })


        } catch (error) {
            res.status(500).json({ message: error.message, success: false })
        }
    }





    async getTransactionAsInpection(req, res) {


        const { inspectAs, userId } = req.query
        let queryObj = {}

        if (inspectAs === "seller") {
            queryObj.seller = userId
        } else if (inspectAs === "buyer") {
            {
                queryObj.buyer = userId
            }
        }



        try {
            const getTransactions = await Transactions.find(queryObj).populate("seller").populate("buyer")
            return res.status(200).json({ message: getTransactions, success: true })
        } catch (error) {
            return res.status(500).json({ message: error.message, success: false })

        }

    }


    async updateTransaction(req, res) {

        const { transactionId } = req.params;
        let updatedField = null
        for (let key in req.body) {
            updatedField = key
        }
        try {
            const updatedTransaction = await Transactions.findByIdAndUpdate(transactionId, {
                $set: req.body
            }, {
                new: true
            })
            if (updatedField === "sellersFeedback") {
                const { sellersFeedback: { rating } } = req.body
                if (!rating) return res.status(200).json({ message: updatedTransaction, success: true })
                const { buyer, seller } = updatedTransaction
                const buyerObj = await User.findById(buyer)

                const hasSellerRatedAlready = buyerObj.ratings.find((rating) => rating.userId.toString() === seller.toString());
                if (!hasSellerRatedAlready) {
                    const saveupdatedUser = await User.findOneAndUpdate(
                        { _id: buyer },
                        { $push: { ratings: { userId: seller, rating } } },
                        { returnOriginal: false }
                    )
                }
                else {
                    await User.findOneAndUpdate(
                        { _id: buyer },
                        { $set: { "ratings.$[element].rating": rating } },
                        {
                            arrayFilters: [
                                { "element.userId": seller }
                            ],
                            returnOriginal: false
                        }
                    )
                }
            } else {
                const { buyersFeedback: { rating } } = req.body
                if (!rating) return res.status(200).json({ message: updatedTransaction, success: true })
                const { buyer, seller } = updatedTransaction
                const sellerObj = await User.findById(seller)
                const hasBuyerRatedAlready = sellerObj.ratings.find((rating) => rating.userId.toString() === buyer.toString());

                if (!hasBuyerRatedAlready) {
                    await User.findOneAndUpdate(
                        { _id: seller },
                        { $push: { ratings: { userId: buyer, rating } } },
                        { returnOriginal: false }
                    )
                }
                else {
                    await User.findOneAndUpdate(
                        { _id: seller },
                        { $set: { "ratings.$[element].rating": rating } },
                        {
                            arrayFilters: [
                                { "element.userId": buyer }
                            ],
                            returnOriginal: false
                        }
                    )
                }
            }

            return res.status(200).json({ message: updatedTransaction, success: true })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: error.message, success: false })
        }
    }

    async buyTokens(req, res) {
        const { userId, VBTcount } = req.body;

        try {
            const theUser = await User.findById(userId)
            console.log(theUser.tokenAvailabe)
            await User.findByIdAndUpdate(userId, {
                tokenAvailabe: VBTcount + theUser.tokenAvailabe
            })
            return res.status(200).json({ message: "VBTbought successfully", success: true })
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong", success: false })
        }
    }

}
module.exports = new TransactionController()