const mongoose = require("mongoose")

export default function connectDB() {
    mongoose.connect("mongodb+srv://hackaton:12345@cluster0.lgyib.mongodb.net/",).then(() => {
        console.log("conectao");
        
    }).catch(() => {
        console.log("no paso nada");
        
    })
}