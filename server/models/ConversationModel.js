const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    text : {
        type : String,
        default : ""
    },
    imageUrl : {
        type : String,
        default : ""
    },
    videoUrl : {
        type : String,
        default : ""
    },
    seen : {
        type : Boolean,
        default : false
    },
    msgByUserId : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'User'
    },
    group: {
        type: mongoose.Schema.ObjectId,
        ref: 'Group'
    }
},{
    timestamps : true
})

const conversationSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'User'
    },
    receiver : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'User'
    },
    messages : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Message'
        }
    ],
    group: {
        type: mongoose.Schema.ObjectId,
        ref: 'Group'
    },
},{
    timestamps : true
})

const MessageModel = mongoose.model('Message',messageSchema)
const ConversationModel = mongoose.model('Conversation',conversationSchema)

module.exports = {
    MessageModel,
    ConversationModel
}