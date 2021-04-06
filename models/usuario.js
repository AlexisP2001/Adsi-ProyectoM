import mongoose from "mongoose";

const usuarioSchema= mongoose.Schema({
    nombre: {type: String, required:true,maxlenght:50},
    email: {type: String,unique:true,maxlenght:50},
    password :{type: String,required:true},
    rol:{type:String,required:true,maxlenght:20},
    estado:{type:Number, default:1},
    createdAt:{type:Date, default:Date.now},
});
export default mongoose.model('Usuario',usuarioSchema)