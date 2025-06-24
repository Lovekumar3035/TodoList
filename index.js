const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/users"); // adjust path as needed
const methodOverride = require('method-override');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//connect mongoDB 
main().then((res) => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/todoList');
}


//home route
app.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.render("home.ejs", { users });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Internal Server Error");
    }
});


//new todo route 
app.get("/new", (req, res) => {
    res.render("form.ejs");
});

app.post("/new/create", async (req, res) => {
    const { username, email, task } = req.body;
    // console.log(req.params);

    try {
        const newUser = new User({
            username,
            email,
            task,
            createdAt: new Date()
        });
        await newUser.save();
        res.redirect("/");
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).send("Internal Server Error");
    }
});


//edit route
app.get("/edit/:id", async (req, res) => {
    let { id } = req.params;
    // console.log(id);
    try {
        const user = await User.findById(id);
        res.render("edit.ejs", { user });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Internal Server Error");
    }
});


//update route
app.post("/update/:id", async (req, res) => {
    let { id } = req.params;
    const { username, email, task } = req.body;
    try {
        await User.findByIdAndUpdate(id, { username, email, task });
        res.redirect("/");
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).send("Internal Server Error");
    }
});

//delete route
app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect("/");
});



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
