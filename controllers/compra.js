import Compra from '../models/compra.js'
import Articulo from '../models/articulo.js'

const aumentarStock=async(id,cantidad)=>{
    let {stock}=await Articulo.findById(id);
    stock=parseInt(stock)+parseInt(cantidad)
    await Articulo.findByIdAndUpdate({id},{stock})
}
const disminuirStock=async(id,cantidad)=>{
    let {stock}=await Articulo.findById(id);
    stock=parseInt(stock)-parseInt(cantidad)
    await Articulo.findByIdAndUpdate({id},{stock})
}

const comprasController={
    compraPost:async(req,res)=>{
        const { usuario, persona,tipoComprobante,serieComprobante,numComprobante,impuesto,total, detalles } = req.body;
        const compra = new Compra({ usuario, persona,tipoComprobante,serieComprobante,numComprobante,impuesto,total,detalles });

        await compra.save();

        detalles.map({articulo}=aumentarStock(articulo._id,articulo.cantidad))

        res.json({
            compra
        })
    },
    compraGet:async(req,res)=>{
        const value = req.query.value;
        const compra = await Compra
            .find({
                $or: [
                    { serieComprobante: new RegExp(value, 'i') },
                    { numComprobante: new RegExp(value, 'i') }
                ]
            })
            .sort({ 'createdAt': 1 })
            .populate('usuario','nombre')

        res.json({
            compra
        })
    },
    compraGetById:async(req,res)=>{
        const { id } = req.params;

        const compra = await Compra.findOne({ _id: id })

        res.json({
            compra
        })

    },
    compraPutActivar : async(req, res) => {
        const{id}=req.params;
        const compra =await Compra.findByIdAndUpdate(id,{estado:1})

        detalles.map({articulo}=aumentarStock(articulo._id,articulo.cantidad))

        res.json({
            compra
        })
    },

    compraPutDesactivar : async(req, res) => {
        const{id}=req.params;
        const compra=await Compra.findByIdAndUpdate(id,{estado:0})

        detalles.map({Articulo}=disminuirStock(articulo._id,articulo.cantidad))

        res.json({
            compra
        })
    },
}

export default comprasController