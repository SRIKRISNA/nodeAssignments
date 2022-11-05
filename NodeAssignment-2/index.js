const express = require("express");
const path = require("path");
const app = express();
//const MainPageController = required("./index.html");

app.listen(5000);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//middleware
//app.use("/index", MainPageController);