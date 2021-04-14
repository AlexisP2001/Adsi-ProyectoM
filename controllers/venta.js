import Venta from '../models/venta.js'
import Articulo from '../models/articulo.js'

const disminuirStock=async(id,cantidad)=>{
    let {stock}=await Articulo.findById(id);
    stock=parseInt(stock)-parseInt(cantidad)
    await Articulo.findByIdAndUpdate({id},{stock})
}

const ventasController={
    ventaPost:async(req,res)=>{
        const { usuario, persona,tipoComprobante,serieComprobante,numComprobante,impuesto,descuento,total, detalles } = req.body;
        const venta = new Venta({ usuario, persona,tipoComprobante,serieComprobante,numComprobante,impuesto,descuento,total,detalles });

        detalles.map((articulo)=>disminuirStock(articulo._id,articulo.cantidad))
        await venta.save();

        res.json({
            venta
        })
    },
    ventaGet:async(req,res)=>{
        const value = req.query.value;
        const venta = await Venta
            .find({
                $or: [
                    { serieComprobante: new RegExp(value, 'i') },
                    { numComprobante: new RegExp(value, 'i') }
                ]
            })
            .sort({ 'nombre': -1 })

        res.json({
            venta
        })
    },
    ventaGetById:async(req,res)=>{
        const { id } = req.params;

        const venta = await Venta.findOne({ _id: id })

        res.json({
            venta
        })

    },
    ventaPutActivar : async(req, res) => {
        const{id}=req.params;
        const venta =await Venta.findByIdAndUpdate(id,{estado:1})
        res.json({
            venta
        })
    },

    ventaPutDesactivar : async(req, res) => {
        const{id}=req.params;
        const venta=await Venta.findByIdAndUpdate(id,{estado:0})
        res.json({
            venta
        })
    },
}

export default ventasController