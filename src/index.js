const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Criar um novo usuário
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
    },
  });

  console.log('User Created:', user);

  // Criar um post associado ao usuário
  const post = await prisma.post.create({
    data: {
      title: 'My first post',
      published: true,
      authorId: user.id, // Relacionando o post ao usuário criado
    },
  });

  console.log('Post Created:', post);

  // Recuperar todos os posts com informações do autor
  const posts = await prisma.post.findMany({
    include: { author: true },
  });

  console.log('Posts:', posts);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  // Iniciar o servidor na porta configurada
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });