const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// CREATE USER
app.post('/users', async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = await prisma.user.create({ data: { email, name } });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL USERS
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({ include: { posts: true } });
  res.json(users);
});

// READ USER BY ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: { posts: true }
  });
  if (user) res.json(user);
  else res.status(404).json({ error: 'User not found' });
});

// UPDATE USER
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { email, name } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { email, name }
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE USER
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start server
app.listen(3000, () =>
  console.log('🚀 Servidor rodando em http://localhost:3000')
);
