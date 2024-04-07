import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    pic:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    preferredLanguage: { type: String, default: 'hi' },    
},
    {timeStamps:true}

);

export default mongoose.model("User",userSchema);