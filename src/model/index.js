//Here we are creating a mongoDB connection
import mongoose from "mongoose";
import config from "../utils/config.js";

main().catch((error)=>console.error('MongoDB connection failed', error))

async function main(){
    await mongoose.connect(`${config.DB_URL}/${config.DB_NAME}`)
    console.log('MongoDB Connected')

}
export default mongoose
