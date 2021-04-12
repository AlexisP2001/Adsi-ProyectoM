import mongoose from "mongoose";

const ventaSchema= mongoose.Schema({
    usuario:{type:mongoose.Schema.Types.ObjectId,ref:'Usuario',required:true},
    persona:{type:mongoose.Schema.Types.ObjectId,ref:'Persona',required:true},
    tipoComprobante: {type: String, required:true,maxlenght:20},
    serieComprobante: {type: String,maxlenght:7},
    numComprobante: {type:String,maxlenght:10},
    impuesto:{type:Number},
    descuento:{type:Number},
    total:{type:Number},
    detalles:{type:Array},
    estado:{type:Number, default:1},
    createdAt:{type:Date, default:Date.now}
});
export default mongoose.model('Venta',ventaSchema)