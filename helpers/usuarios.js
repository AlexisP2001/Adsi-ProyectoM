import Usuario from "../models/usuario.js"

const existeUsuarioById=async(id)=>{
    const existe=await Usuario.findById(id)

    if(!existe){
        throw new Error(`El ID no existe`)
    }
}
const existeEmail=async(email)=>{
    const existe=await Usuario.findOne(email)

    if(existe){
        throw new Error(`Este Email ya se encuentra registrado`)
    }
}

export{existeUsuarioById,existeEmail}