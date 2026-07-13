import app from './src/app.js';

const PORT = process.env.PORT || 3000;

// Esta función es la que mantiene el proceso vivo escuchando peticiones
app.listen(PORT, () => {
  console.log(`🎮 Servidor corriendo en http://localhost:${PORT}`);
});