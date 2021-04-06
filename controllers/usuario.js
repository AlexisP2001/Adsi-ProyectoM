import Usuario from '../models/usuario.js'
import bcryptjs from 'bcryptjs'
import { query } from 'express';

const usuarioController ={
    usuarioGet :async(req,res)=>{
        const query = req.query.value
        const usuarios= await Usuario.find({
            $or:[
                {nombre: new RegExp(query,'i')},
                {email: new RegExp(query,'i')},
                {rol: new RegExp(query,'i')}
            ]
        });

        res.json({
            usuarios
        })
    },

    usuarioPost : async(req,res)=>{ 
        const {nombre,email,password,rol}=req.body;
        const usuario = Usuario({nombre, email, password, rol});

        const salt=bcryptjs.genSaltSync();
        usuario.password=bcryptjs.hashSync(password,salt);

        usuario.save()

        res.json({
            usuario
        })
    },

    usuarioGetById:async(req,res)=>{
        const{id}=req.params
        const usuario=await Usuario.findById(id)

        res.json(
            usuario
        )
    },

    usuarioPut:async(req,res)=>{
        const{id}=req.params
        const {_id,createdAt,estado,__v,email,rol,...resto}=req.body

        if(password){
            const salt=bcryptjs.genSaltSync();
            resto.password=bcryptjs.hashSync(password,salt);
        }

        const usuario=await Usuario.findByIdAndUpdate(id,resto)

        res.json(
            usuario
        )
    },

    usuarioPutActivar: async(req,res)=>{
        const{id}=req.params
        const usuario=await Usuario.findByIdAndUpdate(id,{estado:1})

        res.json({usuario})

    },

    usuarioPutDesactivar: async(req,res)=>{
        const{id}=req.params
        const usuario=await Usuario.findByIdAndUpdate(id,{estado:0})

        res.json({usuario})
    }

}
export default usuarioController