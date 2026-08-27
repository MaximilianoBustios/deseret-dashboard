import "dotenv/config";
import { readFileSync } from "fs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

type SeedProduct = {
  code: string;
  name: string;
  cost: number | null;
  price: number;
  active: boolean;
};

async function main() {
  const products: SeedProduct[] = JSON.parse(
    readFileSync("prisma/data/products_seed.json", "utf-8")
  );

  let done = 0;
  for (const p of products) {
    await prisma.product.upsert({
      where: { code: p.code },
      update: { name: p.name, price: p.price, cost: p.cost, active: p.active },
      create: { code: p.code, name: p.name, price: p.price, cost: p.cost, active: p.active },
    });
    done++;
    if (done % 100 === 0) console.log(`${done}/${products.length}`);
  }
  console.log(`Seed completo: ${done} productos.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());