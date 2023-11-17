import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

async function main() {
  const userOne = await prismaClient.user.create({
    data: {
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: 'johndoe',
    },
  });
  const userTwo = await prismaClient.user.create({
    data: {
      email: 'bhupinderjogi@gmail.com',
      name: 'Bhupinder Jogi',
      password: 'bhupinderjogi',
    },
  });
  console.log({ userOne, userTwo });
}

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async function () {
    await prismaClient.$disconnect();
  });
