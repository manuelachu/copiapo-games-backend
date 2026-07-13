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
    const { titulo, descripcion, precio, imagen, consola } = req.body;
    const usuario_id = req.user.id; 

    if (!titulo || !precio || !consola) {
      return res.status(400).json({ error: "Título, precio y consola son obligatorios" });
    }

    const newGame = await createGame(titulo, descripcion, precio, imagen, consola, usuario_id);
    res.status(201).json({ message: "Juego publicado con éxito", game: newGame });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};