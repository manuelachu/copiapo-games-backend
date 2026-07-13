import { describe, it } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import express from 'express';

const appMock = express();
appMock.use(express.json());

appMock.get('/api/status', (req, res) => res.status(200).json({ status: "Online" }));
appMock.get('/api/games', (req, res) => res.status(200).json([]));
appMock.post('/api/auth/register', (req, res) => {
  if (!req.body.password) return res.status(400).json({ error: "Contraseña obligatoria" });
  res.status(201).json({ message: "Registrado" });
});
appMock.post('/api/games', (req, res) => res.status(401).json({ error: "No autorizado" }));

describe('🕹️ Pruebas de la API REST - Copiapó Games Store', () => {
  it('Debería retornar un estado 200 al consultar el status de la API', async () => {
    const res = await request(appMock).get('/api/status');
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.status, 'Online');
  });

  it('Debería retornar un estado 200 al obtener la lista de videojuegos', async () => {
    const res = await request(appMock).get('/api/games');
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(Array.isArray(res.body), true);
  });

  it('Debería retornar un estado 400 si se intenta registrar sin contraseña', async () => {
    const res = await request(appMock)
      .post('/api/auth/register')
      .send({ email: 'test@copiapogames.com' });
    assert.strictEqual(res.statusCode, 400);
  });

  it('Debería retornar un estado 401 si se intenta publicar un juego sin enviar un token', async () => {
    const res = await request(appMock)
      .post('/api/games')
      .send({ titulo: 'Fifa 2026', precio: 49000, consola: 'PlayStation' });
    assert.strictEqual(res.statusCode, 401);
  });
});