import Articulo from '../models/articulo.js'

const validarNumeros=(precioventa)=>{
    const precio= Articulo.findOne(precioventa)
    const stock2=Articulo.findOne(stock)
    return(req,res,next)=>{
        if(precio!==Number){
            return res.status(401).json({
                msg:'Verifique que el dato sea numerico'
            })
        }else if(stock2!==Number){
            return res.status(401).json({
                msg:'Verifique que el dato sea numerico'
            })
        }
        next();
    }
}
export{validarNumeros}