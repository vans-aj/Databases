//init.js is used to set up the database and add default data when the project starts.
const mongoose = require('mongoose');
const chat = require('./Models/chat.js');
main().then(() =>{
    console.log("connection successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
// creating chat array
let chats = [{
    from : "vansaj",
    to : "mayank",
    message : "hello",
    created_at : new Date()
},
{
    from : "madhav",
    to : "assmit",
    message : "yooyo",
    created_at : new Date()
},
{
    from : "papu",
    to : "aditya",
    message : "bad boy shah",
    created_at : new Date()
},
{
    from : "elvish",
    to : "kilwish",
    message : "jettega jetega ",
    created_at : new Date()
},
{
    from : "sunita",
    to : "vineets",
    message : "systumm",
    created_at : new Date()
}];

chat.insertMany(chats).then((res)=>{
    console.log(res);
}
);