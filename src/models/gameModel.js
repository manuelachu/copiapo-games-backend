import pool from '../config/db.js';

export const getAllGames = async () => {
  const query = 'SELECT * FROM videojuegos';
  const { rows } = await pool.query(query);
  return rows;
};


export const createGame = async (titulo, descripcion, precio, imagen, consola, usuario_id, stock, cargado_por, nombre_contacto, facebook, instagram) => {
  const query = `
    INSERT INTO videojuegos (titulo, descripcion, precio, imagen, consola, usuario_id, stock, cargado_por, nombre_contacto, facebook, instagram) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
    RETURNING *`;
    
  const values = [titulo, descripcion, precio, imagen, consola, usuario_id, stock, cargado_por, nombre_contacto, facebook, instagram];
  const { rows } = await pool.query(query, values);
  return rows[0];
};


export const deleteGameById = async (id, usuario_id) => {
  
  const query = `
    DELETE FROM videojuegos 
    WHERE id = $1 
      AND (
        usuario_id = $2 
        OR $2 IN (SELECT id FROM usuarios WHERE rol = 'admin' OR rol = 'administrador')
      )
    RETURNING *`;
    
  const { rows } = await pool.query(query, [id, usuario_id]);
  return rows[0];
};