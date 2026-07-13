import { createUser, findUserByEmail } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }
    
    const userExists = await findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const newUser = await createUser(email, password);
    res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

   
    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({ message: "Login exitoso", token, user: { email: user.email, rol: user.rol } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};