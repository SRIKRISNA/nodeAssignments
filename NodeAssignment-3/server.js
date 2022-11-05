const express = require("express");
const ejs = require("ejs");

const app = express();

const users = [];

//set ejs
app.set("view engine", "ejs");

//body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//server creation
app.listen(3000, (err, res)=> {
    if(!err) {
        console.log("Server started on port 3000")
    } else {
        console.log(err)
    }
});

app.get("/", (req, res)=> {
    res.render("addlists", {users});
});

app.get("/form", (req, res)=> {
    res.render("form");
});

app.post("/user/add", (req, res)=>{
    users.push(req.body);
    res.redirect("/");
})
// const express = require("express");
// const app = express();
// const path = require("path");
// const users = [];

// app.set('view engine','ejs');
// app.set("views", path.join(__dirname, "view"));

// app.use(express.json());
// app.use(express.urlencoded());

// app.get("/", (req, res)=> {
//     res.render("addlists", {users});
// });

// app.get('/form', (req, res)=>{
//     res.render('form');
// });

// app.post('/', (req, res) => {
//     const body = req.body;
//     arr.push(body);
//     res.render('addlists', (users));
// });

// app.listen(3003, (req, res) => {
//     console.log("server is running");
// });


// /**
//  * <% users.map((user)=>{%>
// <% }) %>
//  */