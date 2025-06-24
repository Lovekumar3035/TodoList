const mongoose = require('mongoose');
const User = require('./models/users.js'); // Import the users model

main().then(() => {
    console.log("Connection to MongoDB is successful");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/todoList');
}


User.insertMany([
    {
        username: "ayush",
        email: "ayush@example.com",
        task: "Hello ravi how are you!",
        createdAt: new Date()
    },
    {
        username: "aman",
        email: "aman@example.com",
        task: "Hello sachin how are you!",
        createdAt: new Date()
    },
    {
        username: "lalit",
        email: "lalit@example.com",
        task: "Hello ashish how are you!",
        createdAt: new Date()
    }

]).then(() => {
    console.log("Users inserted successfully");
}).catch(err => {
    console.error("Error inserting users:", err);
});
