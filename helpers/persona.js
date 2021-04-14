import Persona from '../models/persona.js'

const existePersonaById =async(id)=>{
    const existe = await Persona.findById(id)

    if(!existe) throw new Error(`El ID no existe ${id}`)
}
const existePersonaNumDoc=async(numDocumento)=>{
    const existe = await Persona.findOne({numDocumento:numDocumento})

    if(existe) throw new Error (`Ya existe una persona con ese número de documento`)
}
const existeEmail=async(email)=>{
    const existe = await Persona.findOne({email:email})
    if(existe) throw new Error (`Ya existe alguien registrado con este email`)
}

export{existePersonaById,existePersonaNumDoc,existeEmail}