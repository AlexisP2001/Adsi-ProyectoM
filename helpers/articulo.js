import Articulo from "../models/articulo.js"


const existeArticuloById=async(id)=>{
    const existe = await Articulo.findById(id)

    if(!existe) throw new Error(`El ID no existe ${id}`)
}
const existeArticuloByNombre=async(codigo)=>{
    const existe = await Articulo.findOne({codigo:codigo})

    if(existe) throw new Error (`Ya existe un articulo con ese codigo`)
}

export {existeArticuloById,existeArticuloByNombre}