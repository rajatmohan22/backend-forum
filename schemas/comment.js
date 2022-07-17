const mongoose = require('mongoose');
const {Schema,model} = mongoose
mongoose.connect('mongodb://localhost:27017/forumDB')

const commentSchema = new Schema({
    body: String, /// body of the reply.
    imgURLS: [String], /// Images to support the post/query.
    likes: Number,
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }, /// which post does it belong to?
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    } /// who is the user that the comment is associated with?

})

module.exports = new model('Comment',commentSchema);