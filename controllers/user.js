const User = require("../models/user.js");

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo usuarios", error });
  }
};

// Obtener un solo usuario por ID
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo el usuario", error });
  }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  const { name, apellido, email, password } = req.body;

  try {
    // Validar si el email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const newUser = new User({ name, apellido, email, password });
    await newUser.save();

    res.status(201).json({ message: "Usuario creado correctamente", newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creando el usuario", error });
  }
};

// Actualizar un usuario por ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, apellido, email, password } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, apellido, email, password },
      { new: true } // Retorna el nuevo documento actualizado
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario actualizado correctamente", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando el usuario", error });
  }
};

// Eliminar un usuario por ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando el usuario", error });
  }
};

// Exportar los controladores
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};




/*export function postUser(req, res) {
    const body = req.body

    try {
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message: "Error llame al administrador"})
}}*/