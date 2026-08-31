import { prisma } from "@/lib/prisma";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const products = await prisma.product.findMany({
    where: {
      active: true,
      name: q ? { contains: q, mode: "insensitive" } : undefined,
    },
    orderBy: { name: "asc" },
    take: 20,
  });

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-bold mb-6">Catálogo</h1>
      <form className="mb-6">
        <input
          type="text"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Buscar producto..."
          className="border rounded px-3 py-2 w-full"
        />
        <button type="submit" className="mt-2 bg-black text-white rounded px-4 py-2">Buscar</button>
      </form>
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