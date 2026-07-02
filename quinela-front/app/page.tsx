import Link from "next/link";
import FormularioQuinela from "@/components/FormularioQuinela";
import { getPartidoActivo } from "@/lib/api";

export default async function HomePage() {
  try {
    const partido = await getPartidoActivo();

    return (
      <main className="min-h-screen bg-gray-100 px-4 py-8">
        <FormularioQuinela partido={partido} />

        <div className="mt-6 text-center">
          <Link
            href="/resultados"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Ver tabla de resultados
          </Link>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md rounded-2xl bg-white p-6 text-center shadow-lg">
          <h1 className="text-xl font-bold text-gray-900">
            Quinela no disponible
          </h1>
          <p className="mt-2 text-gray-600">
            No se pudo cargar la información del partido.
          </p>
        </div>
      </main>
    );
  }
}