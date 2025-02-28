import { Schema, model } from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: [true, 'el nombre es requerido'],
        maxLength: [25, 'el nombre no puede exceder los 25 caracteres']
    },
    surname :{
        type: String,
        required: [true, 'el surname es requerido'],
        maxLength: [25, 'el surname no puede exceder los 25 caracteres']
    },
    username :{
        type: String,
        required: true,
        unique: true
    },
    email :{
        type: String,
        required: [true, 'el correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'contrsaña es requerida'],
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"],
        default: "USER_ROLE"
        
    },
    status: {
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

userSchema.methods.toJSON = function(){
    const {__v, password, _id, ...usuario} = this.toObject()
        usuario.uid = _id
        return usuario
    
}

export default model("Usuario", userSchema)