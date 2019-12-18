
const bcrypt =require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{ 
        type : String,
        required : [true,'Le nom est obligatoire.']
    }, 
    email: { 
        type : String,
        required :[true,"L'email est obligatoire."]
    },
    password : {
        type : String,
        required : [true,'Le mot de passe est obligatoire.']
    }
  })

// crypter le mot de passe

UserSchema.pre('save', function (next){
   
    const user = this

    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted
        next()
    })
}) 


module.exports = mongoose.model('user', UserSchema)

