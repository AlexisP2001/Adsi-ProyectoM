import Persona from '../models/persona.js'
import Compra from '../models/compra.js'

const personaProveedor=async(persona)=>{    
    const persona1= await Persona.findOne({_id:persona._id})
    if (persona1.estado===0){throw new Error ('La persona no esta activa')}
    if(persona1.tipoPersona !== "proveedor") throw new Error (`La persona no es un proveedor `)   
}

const personaActiva=async(estado)=>{
    const impuesto1 =await Compra.findOne({estado:estado})
        if(impuesto1===1)throw new Error(`La persona esta desactivada`)
}

const validarImpuesto=async(impuesto)=>{
    const impuesto1 =await Compra.findOne({impuesto:impuesto})
        if(impuesto1==!Number)throw new Error(`El dato debe ser númerico`)
}

const validarTotal = async(total)=>{
    const total1 =await Compra.findOne({total:total})
    if(total1 ==! Number)throw new Error(`El dato debe ser númerico`)
}

const existeSerieComprobante =async(serieComprobante)=>{
    const existe = await Compra.findOne({serieComprobante})

    if(existe) throw new Error(`El número de serie del comprobante ya existe`)
}
const existeCompraById =async(id)=>{
    const existe = await Categoria.findById(id)

    if(!existe) throw new Error(`El ID no existe ${id}`)
}

export {personaProveedor,validarImpuesto,validarTotal,existeSerieComprobante,existeCompraById,personaActiva} 