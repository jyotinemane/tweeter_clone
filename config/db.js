const  Mongoose  = require("mongoose");
const db  = async()=>{
    try{
        await Mongoose.connect(process.env.MongoUrl)
        console.log("mongoose connected ")

    }catch(error){
        console.log("not coonected",error);
        process.exit()
    }
}
module.exports=db