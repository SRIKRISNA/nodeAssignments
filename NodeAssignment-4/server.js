const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const userModal = require("./userSchema");
const methodOverride = require("method-override");

const app = express();

const user = [];

//set ejs
app.set("view engine", "ejs");

//body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));

const getClass = (isPromoted)=> {
    //null-> secondary  //false--> danger //true-> primary
    let className = "secondary";
    if(isPromoted) {
        className = "primary";
    } else if(isPromoted !==null) {
        className= "danger";
    }
    return className;
}

//server creation
app.set("view engine", "ejs");

app.listen(3000, (err, res)=> {
    if(!err) {
        console.log("Server started on port 3000")
    } else {
        console.log(err)
    }
});

//db connection
mongoose.connect("mongodb://localhost/assignment_4",()=> {
    console.log("Connected to db")
}, (err)=> {
    console.log(err);
});

//form redirect
app.get("/form", (req, res)=> {
    res.render("form");
});

//fetching data of user collection from mongoose
app.get("/", (req, res)=> {
    userModal.find().then((user)=> {
        res.render("user", {user, getClass});
    })
});

//add users if not exist
app.post("/user/add", (req, res)=>{
    userModal.find({email: req.body.email}).then((userData)=> {
        if(userData.length) {
            res.status(400).send("User Exist");
        } else {
            userModal.create({fname: req.body.fname, email: req.body.email, isPromoted: null}).then(()=> {
               res.redirect("/");
                
            }).catch((err)=> {
                console.log(err)
            })
        }
    })
})

//update users data
app.put("/user/update/:id", (req, res)=> {
    userModal.find({email: req.params.id}).then((userData)=> {
        userModal.updateOne({email: req.params.id}, {isPromoted: !userData[0].isPromoted}).then(()=> {
            res.redirect("/");
        }).catch((err)=> {
            res.status(400).send(err)
        })
    })
    
});

//delete user data
app.delete("/user/delete/:id", (req, res)=> {
    userModal.deleteOne({email: req.params.id}).then(()=> {
        res.redirect("/")
    })
})
