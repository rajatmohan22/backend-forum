const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {Schema,model} = mongoose
mongoose.connect('mongodb://localhost:27017/forumDB');


const userSchema = new Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post' 
        }
    ],
    tokens: [
        {
            token: 
            {
                type: String
            }
        }
    ]
})

userSchema.pre('save', function(next) {                                                                                                                                        
    if(this.password) {                                                                                                                                                        
        var salt = bcrypt.genSaltSync(10)                                                                                                                                     
        this.password  = bcrypt.hashSync(this.password, salt)                                                                                                                
    }                                                                                                                                                                          
    next()                                                                                                                                                                     
}) 


module.exports = new model('User',userSchema);



