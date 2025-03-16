const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require('path');
const chat = require('./Models/chat.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

main().then(() =>{
    console.log("connection successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let chat1 = new chat ({
    from : "vansaj",
    to : "mayank",
    message : "hello",
    created_at : new Date()
});
chat1.save().then((res)=>{
    console.log(res);
});

// creating index route 
app.get('/chats', async (req, res) => {
    try {
        let chats = await chat.find();
        console.log("Fetched Chats from DB:", chats);  // Debugging Output
        res.render('index.ejs', { chats });
    } catch (err) {
        console.log("Error fetching chats:", err);
        res.send("Error loading chats");
    }
});

app.get('/', (req, res) => {
    res.send("every thing is ok");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}
);

async function insertChats() {
    try {
        await chat.deleteMany({}); // Delete old chats
        console.log("Old chats deleted!");

        await chat.insertMany(chats);
        console.log("Chats inserted successfully!");

        mongoose.connection.close();
    } catch (error) {
        console.log("Error inserting chats:", error);
    }
}
