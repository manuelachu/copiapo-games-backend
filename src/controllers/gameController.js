import { getAllGames, createGame, deleteGameById } from '../models/gameModel.js';

export const getGames = async (req, res) => {
  try {
    const games = await getAllGames();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addGame = async (req, res) => {
  try {
    // 🌟 Capturamos los campos del formulario
    const { titulo, descripcion, precio, imagen, consola, stock, cargado_por, nombre_contacto, facebook, instagram } = req.body;
    const usuario_id = req.user.id; 

    if (!titulo || !precio || !consola) {
      return res.status(400).json({ error: "Título, precio y consola son obligatorios" });
    }

    const stockValue = stock !== undefined ? parseInt(stock) : 0;
    const creadorLabel = cargado_por || 'usuario sean usuarios';

    // 🌟 Enviamos los parámetros al modelo
    const newGame = await createGame(titulo, descripcion, precio, imagen, consola, usuario_id, stockValue, creadorLabel, nombre_contacto, facebook, instagram);
    
    res.status(201).json({ message: "Juego publicado con éxito", game: newGame });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🌟 Controlador para eliminar el juego
export const removeGame = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user.id; // Obtenido del authMiddleware

    const deletedGame = await deleteGameById(id, usuario_id);

    if (!deletedGame) {
      return res.status(404).json({ error: "El juego no existe o no tienes permisos para eliminarlo." });
    }

    res.status(200).json({ message: "Juego eliminado exitosamente debido a venta.", game: deletedGame });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};