require('dotenv').config()
const express = require("express")
const app = express()
const cors = require("cors")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const passport = require("passport")
const path = require("path")
const fs = require("fs")

app.use(cors({
    origin: [
        process.env.FRONTEND_URL,
        'http://localhost:3000'
    ],
    methods: ["POST,PUT,GET,DELETE,PUT,OPTIONS"],
    credentials: true
}))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});
app.set("trust proxy", 1)



app.get('/profile/:userId/post/:postId', function (req, res) {

    const filePath = path.resolve(__dirname, "./build", "index.html")

    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            res.send('error')
            return console.log(err)
        }
        data = data
            .replace(/__TITLE__/g, "I am selling the flower")
            .replace(/__DESCRIPTION__/g, "I am selling the flower")
            .replace(/__IMAGE__/g, "https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png")
            .replace(/__WEBSITEURL__/g, process.env.SITE_URL)
            .replace(/__THEDESCRIPTION__/g, "i am selling the flower anybody interested to buy  ?")
        res.send(data)
    })

})

app.use(express.static(path.join(__dirname, './build')))

app.use(cookieParser())
app.use(express.json())
app.use(morgan("common"))

require("./services/db/connectDb")()
require("./services/passport/passport")

const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 31556952000,
    collectionName: "vrumies_session",
    autoRemove: 'native',
})


app.use(session({
    name: "vrumies.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 31556952000,
        httpOnly: true,
        sameSite: "none",
    },
    store,
}))

app.use(passport.initialize())
app.use(passport.session())


require("./AllRoutes")(app)


app.listen(8000, () => console.log("server started at port 8000"))
