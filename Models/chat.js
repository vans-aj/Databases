const mongoose = require('mongoose');
const Schema = mongoose.Schema ({
    from :  {
        type : String,
        required : true //The required: true property ensures that the field cannot be left blank when creating a document
    },
    to : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    created_at : {
        type : Date,
        default : Date.now,
        required : true
    }   
});

const Chat = mongoose.model('Chat', Schema);
module.exports = Chat; //module.exports = Chat; allows you to use the Chat model in other files. Without it, you wouldn’t be able to access the Chat model outside this file.
