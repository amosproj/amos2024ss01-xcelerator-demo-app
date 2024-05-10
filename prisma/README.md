# Docs

### Setup 🛠

Install Prisma

```sh
pnpm add -D @prisma/cli
```

Install the Prisma Client

```sh
pnpm add prisma
```

Initialize Prisma

```sh
pnpx prisma init
```

generating the Prisma Client

```sh
pnpx prisma generate
```

### Usage 🚀

First you need to apply the migrations to your database with the following command:

```sh
pnpx prisma migrate dev
```

Then u can use the Prisma Client in your code to access your database:

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const allUsers = await prisma.user.findMany();
	console.log(allUsers);
}
```

### Seeding the database 🌱

If you want to seed the database with some initial data, you can use the following command:

```sh
pnpx prisma db seed
```

### Inspecting the database 🕵️‍♂️

If you want to inspect the database, you can use Prisma Studio. You can start it with the following command:

```sh
pnpx prisma studio
```

Or you can also use alternative tools like [DataGrip](https://www.jetbrains.com/datagrip/) ...
