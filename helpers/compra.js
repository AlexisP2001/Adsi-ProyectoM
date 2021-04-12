import Persona from '../models/persona.js'
import Compra from '../models/compra.js'

const personaProveedor=async(id,persona)=>{
    let{tipoPersona}=await Persona.findById(id)
    persona=tipoPersona
    if(persona ==! 'proveedor') throw new Error (`La persona no es un proveedor`)   
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

export {personaProveedor,validarImpuesto,validarTotal,existeSerieComprobante} 