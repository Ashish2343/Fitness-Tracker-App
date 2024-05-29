const mongoose= require('mongoose');
const {Schema} = require('mongoose');
const bcrypt= require('bcrypt');

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },name:{
        type:String,
        required:true
    },password:{
        type:String,
        required:true
    }

},{timestamps:true});

userSchema.pre('save',async function(next){
    try{
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password,7);
    } 
    next();
}catch(err){
    next(err);
}
});


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
 }


const User = mongoose.model('User',userSchema);

module.exports = User;