import mongoose, { Collection } from "mongoose";

const categoriaSchema= mongoose.Schema({
    nombre: {type: String, required:true,maxlenght:50,unique:true},
    descripcion: {type: String,maxlenght:50},
    estado:{type:Number, default:1},
    createdAt:{type:Date, default:Date.now}
});
export default mongoose.model('Categoria',categoriaSchema)
// TABLAS => Collection
// CAMPOS => PROPERTY
// REGRISTROS => Documents