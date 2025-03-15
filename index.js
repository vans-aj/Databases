const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require('path');
const chat = require('./Models/chat.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname , "public")));

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
/*When you create a new instance of the Chat model like this:It only creates a new object in memory, but it does not automatically store it in the database.
To store the object in the database, you need to call the save() method on the object.
The save() method returns a promise, so you can use the then() method to handle the response from the database.
*/
chat1.save().then((res)=>{
    console.log(res);
});

// creating index route 
//An index route is a route that displays a list of all records from a database.

app.get('/chats', async (req, res)=>{
    let chats = await chat.find();
    console.log(chats);
    res.render('index.ejs', {chats});
})

app.get('/', (req, res) => {
    res.send("every thing is ok");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}
);
// now i have initialized init.js to initialize the database 
