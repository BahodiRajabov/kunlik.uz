const express = require("express")
const cors = require("cors")
const api = require("./routes/global")
const fileUpload = require("express-fileupload")
const helmet = require("helmet");

const app = express()

app.use(helmet());

// Parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static folders
app.use(express.static("public"))
app.use("/uploads",express.static("uploads"))

// upload middleware
app.use(fileUpload())

// Cors middleware
app.use(cors({ origin: "*" }))

// Express Application Settings
app.set("view engine", "ejs")

// Routes 
app.get("/", (req, res) => {
  res.render("index")
})
app.get("/profile", (req, res) => {
  res.render("profile")
})
app.get("/register", (req,  res) => {
  res.render("register")
})

app.get("/create", (req,  res) => {
  res.render("create-job")
})


app.use("/api", api)

app.use((err, req, res, next) => {
  const error = {
    msg:err.message || err.details[0].message,
    success:false,
    statusCode:400,
  }
  res.send(error)
  console.log(err);
})

// _________LISTEN PORT___________
const port = process.env.PORT || 5000

app.listen(port, () => console.log("Listening port on " + port))