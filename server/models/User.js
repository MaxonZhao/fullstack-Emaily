const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

// load this userSchema into mongoose
mongoose.model('users', userSchema);
