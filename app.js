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
app.use("/assets", express.static("public"))

// upload middleware
app.use(fileUpload())

// Cors middleware
app.use(cors({ origin: "*" }))

// Express Application Settings

// Routes 
app.use("/api", api)

app.use((err,req,res,next)=> {
  res.send(err)
  console.log(err);
})

// _________LISTEN PORT___________
const port = process.env.PORT || 5000

app.listen(port, () => console.log("Listening port on " + port))