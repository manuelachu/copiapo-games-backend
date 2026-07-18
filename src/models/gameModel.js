import pool from '../config/db.js';

export const getAllGames = async () => {
  // Al usar SELECT *, automáticamente traerá el nuevo campo stock
  const query = 'SELECT * FROM videojuegos';
  const { rows } = await pool.query(query);
  return rows;
};

export const createGame = async (titulo, descripcion, precio, imagen, consola, usuario_id, stock) => {
  const query = `
    INSERT INTO videojuegos (titulo, descripcion, precio, imagen, consola, usuario_id, stock) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) 
    RETURNING *`;
  // Agregamos el parámetro stock al arreglo de valores ($7)
  const values = [titulo, descripcion, precio, imagen, consola, usuario_id, stock];
  const { rows } = await pool.query(query, values);
  return rows[0];
};