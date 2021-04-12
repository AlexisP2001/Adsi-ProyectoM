import mongoose from "mongoose";

const personasSchema= mongoose.Schema({
    tipoPersona:{type:String,required:true,maxlenght:50},
    nombre: {type: String, required:true,maxlenght:50,unique:true},
    tipoDocumento:{type:String,required:true,maxlenght:20},
    numDocumento:{type:String,required:true,maxlenght:20},
    direccion:{type:String,maxlenght:70},
    telefono:{type:String,maxlenght:15},
    email:{type:String,required:true,maxlenght:50,unique:true},
    createdAt:{type:Date, default:Date.now},
    estado:{type:Number, default:1},
});
export default mongoose.model('Persona',personasSchema)