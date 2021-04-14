import Persona from '../models/persona.js'

const personasControllers={
    personaPost:async (req,res)=>{
    const {tipoPersona,nombre,tipoDocumento,numDocumento,direccion,telefono,email} = req.body;
    const persona = new Persona({tipoPersona,nombre,tipoDocumento,numDocumento,direccion,telefono,email});

    await persona.save();

    res.json({
        persona
    })
    },
    personaGet:async (req,res)=>{
        const query = req.query.value
        const personas= await Persona.find({
            $or:[
                {nombre: new RegExp(query,'i')},
                {email: new RegExp(query,'i')},
                {numDocumento: new RegExp(query,'i')}
            ]
        });

        res.json({
            personas
        })
    },
    personaGetListClientes:async(req,res)=>{
        const value = req.query.value;
        const persona = await Persona
        .find(
            {$and:[{ tipoPersona:'cliente' },
            {$or :[
                {nombre: new RegExp(value,'i')},
                {tipoDocumento: new RegExp(value,'i')},
                {numDocumento: new RegExp(value,'i')},
                {direccion: new RegExp(value,'i')},
                {telefono: new RegExp(value,'i')},
                {email: new RegExp(value,'i')},
            ]}
        ]})
        res.json({
            persona
        })
    },
    personaGetListProveedores:async(req,res,next)=>{
        const value = req.query.value;
        const persona = await Persona
        .find(
            {$and:[{ tipoPersona:'proveedor' },
            {$or :[
                {nombre: new RegExp(value,'i')},
                {tipoDocumento: new RegExp(value,'i')},
                {numDocumento: new RegExp(value,'i')},
                {direccion: new RegExp(value,'i')},
                {telefono: new RegExp(value,'i')},
                {email: new RegExp(value,'i')},
            ]}
        ]})
        res.json({
            persona
        })
    },
    personaGetById:async(req,res)=>{
        const{id}=req.params
        const persona=await Persona.findById(id)

        res.json(
            persona
        )
    },
    personaPut:async(req,res)=>{
        const{id}=req.params;
        const{_id,estado,createAt,__v,...resto}=req.body

        const persona= await Persona.findByIdAndUpdate(id,resto)

        res.json({
            persona
        })
    },
    personaDelete:async(req,res)=>{
        const{id}=req.params;
        const persona = await Persona.findOneAndDelete(id)
        res.json({
            persona
        })
    },
    personaActivar:async(req, res)=>{
        const{id}=req.params;
        const persona =await Persona.findByIdAndUpdate(id,{estado:1})
        res.json({
            persona
        })
    },
    personaDesactivar:async(req, res)=>{
        const{id}=req.params;
        const persona =await Persona.findByIdAndUpdate(id,{estado:0})
        res.json({
            persona
        })
    }
}

export default personasControllers