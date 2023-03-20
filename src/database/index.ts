import mongoose from "mongoose";

mongoose.connect(`${process.env.MONGO_REDIRECT_URL}`)
.then(()=> console.log('Connected to Database' ))
.catch(err => console.error(err));