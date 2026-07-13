import pool from '../config/db.js';

export const getAllGames = async () => {
  const query = 'SELECT * FROM videojuegos';
  const { rows } = await pool.query(query);
  return rows;
};

export const createGame = async (titulo, descripcion, precio, imagen, consola, usuario_id) => {
  const query = `
    INSERT INTO videojuegos (titulo, descripcion, precio, imagen, consola, usuario_id) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *`;
  const values = [titulo, descripcion, precio, imagen, consola, usuario_id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};