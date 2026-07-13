import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

export const createUser = async (email, password) => {
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  const query = 'INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING id, email, rol';
  const values = [email, hashedPassword];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM usuarios WHERE email = $1';
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};