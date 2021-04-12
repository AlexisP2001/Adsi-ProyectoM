import Articulo from "../models/articulo.js"


const existeArticuloById=async(id)=>{
    const existe = await Articulo.findById(id)

    if(!existe) throw new Error(`El ID no existe ${id}`)
}
const existeArticuloByCodigo=async(codigo)=>{
    const existe = await Articulo.findOne({codigo:codigo})

    if(existe) throw new Error (`Ya existe un articulo con ese codigo`)
}
const validarPrecio=async(precioventa)=>{
    const precio =await Articulo.findOne({precioventa:precioventa})
        if(precio==!Number)throw new Error(`El dato debe ser númerico`)
}
const validarStock = async(stock)=>{
    const stock2 =await Articulo.findOne({stock:stock})
    if(stock2 ==! Number)throw new Error(`El dato debe ser númerico`)
}

export {existeArticuloById,existeArticuloByCodigo,validarPrecio,validarStock}