const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Ingresa tu nombre"],
      },
  
      apellido: {
        type: String,
        required: [true, "Ingresa tu apellido"],
      },
  
      email: {
        type: String, 
        required: [true, "Ingresa tu email"],
        match: [
          /^\S+@\S+\.\S+$/, 
          "Por favor ingresa un email válido"
        ],
      },
  
      password: {
        type: String, 
        required: [true, "Ingresa tu password"],
        minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
      },
    },
  );
  

const User = mongoose.model("User", UserSchema);

module.exports = User;