const mongoose = require ('mongoose');

const { Schema } = mongoose;
const bcrypt = require ('bcyrypt');
const Order = require ('./order');


const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        trim:true
    },
    lastName: {
        type: String,
        required: true,
        trim:true
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    orders: [Order.schema]
});


userSchema.pre('save', async function (next){
    if (this.isNew || this.isModified('password')){
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);

    }

    next();

});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);

};
const User = mongoose.model('User', userSchema);

module.exports = User;


