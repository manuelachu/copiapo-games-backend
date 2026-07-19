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
    // 📦 Añadimos 'stock' y el nuevo campo 'cargado_por' a la desestructuración
    const { titulo, descripcion, precio, imagen, consola, stock, cargado_por } = req.body;
    const usuario_id = req.user.id; 

    if (!titulo || !precio || !consola) {
      return res.status(400).json({ error: "Título, precio y consola son obligatorios" });
    }

    // 🚀 Le pasamos el stock (si no viene, por defecto será 0) al modelo
    const stockValue = stock !== undefined ? parseInt(stock) : 0;

    // 🎯 Capturamos la etiqueta (si por alguna razón viene vacía, le ponemos un valor por defecto seguro)
    const creadorLabel = cargado_por || 'usuario sean usuarios';

    // 🚀 Pasamos 'creadorLabel' como último argumento a la función del modelo
    const newGame = await createGame(titulo, descripcion, precio, imagen, consola, usuario_id, stockValue, creadorLabel);
    
    res.status(201).json({ message: "Juego publicado con éxito", game: newGame });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};