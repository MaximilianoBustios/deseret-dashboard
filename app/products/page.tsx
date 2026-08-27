import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
    take: 5,
  });

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-bold mb-6">Catálogo</h1>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left p-2">Código</th>
            <th className="text-left p-2">Producto</th>
            <th className="text-right p-2">Precio</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.code}</td>
              <td className="p-2">{p.name}</td>
              <td className="p-2 text-right">${Number(p.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}