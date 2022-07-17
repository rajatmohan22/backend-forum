const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken')


module.exports= (username) => {
    return jwt.sign(username, process.env.SECRET, { expiresIn: '1800s' });
}