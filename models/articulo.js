import mongoose from "mongoose";

const ArticuloSchema= mongoose.Schema({
    categoria:{type:mongoose.Schema.Types.ObjectId,ref:'Categoria',required:true},
    codigo: {type: String, required:true,maxlenght:64,unique:true},
    nombre: {type: String, required:true,maxlenght:50,unique:true},
    descripcion: {type: String,maxlenght:255},
    precioventa: {type:Number,default:0},
    stock:{type:Number,default:0},
    estado:{type:Number, default:1},
    createdAt:{type:Date, default:Date.now}
});
export default mongoose.model('Articulo',ArticuloSchema)