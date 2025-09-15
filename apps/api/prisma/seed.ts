import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Check if users already exist
  const existingUsers = await prisma.user.findMany();
  if (existingUsers.length > 0) {
    console.log('Database already seeded. Skipping...');
    return;
  }

  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob',
    },
  });

  // Create sample posts
  const post1 = await prisma.post.create({
    data: {
      title: 'Hello World',
      content: 'This is my first post!',
      published: true,
      author: {
        connect: { id: user1.id },
      },
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Getting Started with Prisma',
      content: 'Prisma is a great ORM for TypeScript applications.',
      published: true,
      author: {
        connect: { id: user1.id },
      },
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: 'NestJS Patterns',
      content: 'NestJS provides a great structure for building applications.',
      published: false,
      author: {
        connect: { id: user2.id },
      },
    },
  });

  console.log('Seeding completed successfully!');
  console.log(`Created users: ${user1.name}, ${user2.name}`);
  console.log(`Created posts: ${post1.title}, ${post2.title}, ${post3.title}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
