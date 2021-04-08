import Articulo from '../models/articulo.js'

const articuloControllers={
     articuloGet:async(req,res)=>{
        const articulos=await Articulo
        .find()
        .populate('categoria','nombre')
    
        res.json({
            articulos
        })
    },
    
     articulosPost:async(req,res)=>{
        const {categoria, codigo, nombre, descripcion, precioventa, stock}=req.body
        const articulo= new Articulo({categoria, codigo, nombre, descripcion, precioventa, stock})
    
        await  articulo.save();
    
        res.json({
            articulo
        })
    },
     articulosGetById:async(req,res)=>{
        const { id } = req.params;
    
            const articulo = await Articulo.findOne({ _id: id })
    
            res.json({
                articulo
            })
    },
    articuloPut: async (req, res) => {
        const{id}=req.params;
        const{_id,estado,createAt,codigo,__v,...resto}=req.body

        const articulo= await Articulo.findByIdAndUpdate(id,resto)

        res.json({
            articulo
        })
    },
    articuloPutActivar : async(req, res) => {
        const{id}=req.params;
        const articulo =await Articulo.findByIdAndUpdate(id,{estado:1})
        res.json({
            articulo
        })
    },

    articuloPutDesactivar : async(req, res) => {
        const{id}=req.params;
        const articulo=await Articulo.findByIdAndUpdate(id,{estado:0})
        res.json({
            articulo
        })
    },

    articuloDelete : async(req, res) => {
        const{id}=req.params;
        const articulo = await Articulo.findOneAndDelete(id)
        res.json({
            articulo
        })
    }
}

export default articuloControllers