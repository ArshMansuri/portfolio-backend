const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const AdminSchema = mongoose.Schema({

    email:{
        type: String,
        required: true 
    },

    password:{
        type: String,
        required: true,
        select: false
    },

    isActive:{
        type: Boolean,
        default: false
    },

    username:{
        type: String
    },

    visitorCount: Number,
    projectCount: Number,

    skills: [{
        lanName: String,
        percentage: Number
    }],

    phoneNumber: String

})

AdminSchema.pre("save", async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
})

AdminSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

AdminSchema.methods.CreateToken = async function(){
    return jwt.sign({_id: this._id},process.env.JWT)
}

module.exports = mongoose.model("Admin", AdminSchema)