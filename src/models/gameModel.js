import pool from '../config/db.js';

export const getAllGames = async () => {
 
  const query = 'SELECT * FROM videojuegos';
  const { rows } = await pool.query(query);
  return rows;
};

export const createGame = async (titulo, descripcion, precio, imagen, consola, usuario_id, stock, cargado_por) => {
  const query = `
    INSERT INTO videojuegos (titulo, descripcion, precio, imagen, consola, usuario_id, stock, cargado_por) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
    RETURNING *`;
    
  
  const values = [titulo, descripcion, precio, imagen, consola, usuario_id, stock, cargado_por];
  const { rows } = await pool.query(query, values);
  return rows[0];
};