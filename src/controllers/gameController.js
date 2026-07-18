import { getAllGames, createGame } from '../models/gameModel.js';

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
    // 📦 Añadimos 'stock' a la desestructuración
    const { titulo, descripcion, precio, imagen, consola, stock } = req.body;
    const usuario_id = req.user.id; 

    if (!titulo || !precio || !consola) {
      return res.status(400).json({ error: "Título, precio y consola son obligatorios" });
    }

    // 🚀 Le pasamos el stock (si no viene, por defecto será 0) al modelo
    const stockValue = stock !== undefined ? parseInt(stock) : 0;

    const newGame = await createGame(titulo, descripcion, precio, imagen, consola, usuario_id, stockValue);
    res.status(201).json({ message: "Juego publicado con éxito", game: newGame });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};