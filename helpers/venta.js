import Venta from '../models/venta.js'

const personaCliente=async(persona)=>{    
    const persona1= await Persona.findOne({_id:persona._id})
    if (persona1.estado===0){throw new Error ('La persona no esta activa')}
    if(persona1.tipoPersona !== "cliente") throw new Error (`La persona no es un Cliente `)   
}

const validarImpuesto=async(impuesto)=>{
    const impuesto1 =await Venta.findOne({impuesto:impuesto})
        if(impuesto1==!Number)throw new Error(`El dato debe ser númerico`)
}

const validarTotal = async(total)=>{
    const total1 =await Venta.findOne({total:total})
    if(total1 ==! Number)throw new Error(`El dato debe ser númerico`)
}

const validarDescuento=async(descuento)=>{
    const descuento1 =await Venta.findOne({descuento:descuento})
        if(descuento1==!Number)throw new Error(`El dato debe ser númerico`)
 }
const existeVentaById =async(id)=>{
    const existe = await Venta.findById(id)

    if(!existe) throw new Error(`El ID no existe ${id}`)
}
    
  export{validarDescuento,validarTotal,validarImpuesto,existeVentaById,personaCliente}