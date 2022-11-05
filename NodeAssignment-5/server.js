const express = require("express");
const {userModel, postModel} = require("./schema");
require("dotenv").config();

const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = 10;


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(3006, (err)=>{
    if(!err){
        console.log("server started on 3006");
    }
});

//database connect with mongo
mongoose.connect("mongodb://localhost/assignment_5", ()=>{
    console.log("db connected...!!!");
}, (err)=>{
    console.log(err);
});

//registeration of user
app.post("/register", (req, res)=>{
    bcrypt.genSalt(salt, (err, hashSalt)=>{
        bcrypt.hash(req.body.password, hashSalt, (err, passwordHash)=>{
            userModel.create({name: req.body.name, email: req.body.email, password: passwordHash}).then(()=>{
                //console.log("inner file");
                res.status(200).send("User Added Successfully..!");

            }).catch((err)=>{
                //console.log("exsiting file")
                res.status(400).send(err);
            })
        })
    })
});

//user login
app.post("/login", (req, res)=>{
    userModel.find({email: req.body.email}).then((user)=>{
        if(user.length){
            bcrypt.compare(req.body.password, user[0].password).then((match)=>{
                if(match){
                    //jWT generates
                    //payload: Secret_key
                    const authToken = jwt.sign(req.body.email, process.env.SECRET_KEY);
                    res.status(200).send({authToken});
                }else{
                    res.status(400).send("Invalid Password");
                }
            });
        }else{
            res.status(400).send("User Not Exists, register now");
        }
    })
});

//creating new post
app.post("/post", (req, res)=>{
    if(req.headers.authorization){
        try{
            const email = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
            postModel.create({body: req.body.body, image: req.body.image, title: req.body.title, user: email}).then(()=>{
                res.status(200).send("your new post added ");
            });
        }catch(err){
            res.status(403).send("user not authorized");
        }
    }else{
        res.status(400).send("Missing authorization token");
    }
});

//checking details of posts
app.get("/post", (req,res)=>{
    if(req.headers.authorization){
        try{
            const email = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
            postModel.find({user: email}).then((posts)=>{
                res.status(200).send(posts);
            })
        }catch(err){
            res.status(403).send("user not authorized");
        }
    }else{
        res.status(400).send("Missing authorization token");
    }
});

//update
app.put("/post/:postId", (req, res)=>{
    if(req.headers.authorization){
        postModel.find({_id: req.params.postId}).then((post)=>{
            try{
                const email = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
                //console.log(email);
                if(post[0].user ===  email){
                    postModel.updateOne({_id: req.params.postId }, req.body).then((posts) => {
                        res.status(200).send("post updated...!");
                    });
                }else{
                    res.status(403).send("Unauthorized user, you can't update post");
                }
            }catch(err){
                res.status(403).send("User not authorized");
            }
        })
    }else{
        res.status(400).send("Missing athorization token");
    }
});

//delete
app.delete("/post/:postId", (req, res)=>{
    if(req.headers.authorization){
        postModel.find({_id: req.params.postId}).then((post)=>{
            try{
                const email = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
                //console.log(email);
                if(post[0].user ===  email){
                    postModel.deleteOne({_id: req.params.postId }, req.body).then((posts) => {
                        res.status(200).send("post deleteed...!");
                    });
                }else{
                    res.status(403).send("Unauthorized user, you can't update post");
                }
            }catch(err){
                res.status(403).send("User not authorized");
            }
        })
    }else{
        res.status(400).send("Missing athorization token");
    }
});