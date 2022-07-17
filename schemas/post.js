const mongoose = require('mongoose');
const {Schema,model} = mongoose
mongoose.connect('mongodb://localhost:27017/forumDB')


const postSchema = new Schema({
    title: String,
    body: String,
    likes: Number,
    imgUploads: [String],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

module.exports = new model('Post',postSchema);