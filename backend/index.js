const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "DELETE", "PUT"]
}))
require('dotenv').config()
require("./services/db/connectDb")()
app.use(express.json())


app.use("/api/post", require("./routes/post"))
app.use("/api/user", require("./routes/user"))
app.use("/api/reply", require("./routes/reply"))
app.use("/api/category", require("./routes/category"))
app.use("/api/transaction", require("./routes/transaction"))



app.listen(8000, () => console.log("server started at port 8000"))

