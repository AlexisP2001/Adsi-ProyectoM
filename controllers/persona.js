import Persona from '../models/persona.js'

const personaController={
    personaPost:async(req,res)=>{
        const { tipopersona,nombre, tipodocumento,numdocumento,direccion,telefono,email } = req.body;
        const persona = new Categoria({ tipopersona,nombre, tipodocumento,numdocumento,direccion,telefono,email  });

        await categoria.save();

        res.json({
            persona
        })
    }
}

export default personaController