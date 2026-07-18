import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  allowExitOnIdle: true,
  ssl: {
    rejectUnauthorized: false
  }
});

// 🚀 FUNCIÓN AUTOMÁTICA PARA AGREGAR LA COLUMNA STOCK
const verificarYAgregarStock = async () => {
  try {
    const checkColumnQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='videojuegos' AND column_name='stock';
    `;
    const res = await pool.query(checkColumnQuery);

    if (res.rowCount === 0) {
      await pool.query('ALTER TABLE videojuegos ADD COLUMN stock INT DEFAULT 0;');
      console.log('✅ Columna "stock" agregada con éxito a la tabla videojuegos.');
    } else {
      console.log('ℹ️ La columna "stock" ya existe en la base de datos.');
    }
  } catch (error) {
    console.error('❌ Error al verificar/agregar la columna stock:', error.message);
  }
};

// Se ejecuta de inmediato al levantar la conexión
verificarYAgregarStock();

export default pool;