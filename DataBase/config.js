import mongoose from 'mongoose'

const dbConnection =async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CNX,{
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex:true,
            useFindAndModify:false
        });
        console.log('Base de datos Online');

    } catch (error){
        throw new Error('Error al iniciar la base de datos')
    }
}

export default dbConnection