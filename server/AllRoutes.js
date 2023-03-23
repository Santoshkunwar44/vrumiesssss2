module.exports = function RoutessInit(app) {
    app.use("/api/chat", require("./routes/ChatRoute"))
    app.use("/api/message", require("./routes/MessageRoute"))
    app.use("/api/passport", require("./routes/passport"))
    app.use("/api/post", require("./routes/post"))
    app.use("/api/user", require("./routes/user"))
    app.use("/api/category", require("./routes/category"))
    app.use("/api/reply", require("./routes/reply"))
    app.use("/api/payment", require("./routes/payment"))
    app.use("/api/transaction", require("./routes/transaction"))
    app.use("/api/content", require("./routes/ContentRoute"))
    app.use("/api/shop", require("./routes/shopRoute"))
}