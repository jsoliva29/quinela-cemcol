import Link from "next/link";
import TablaResultados from "@/components/TablaResultados";
import { getTablaPosiciones } from "@/lib/api";

export default async function ResultadosPage() {
  try {
    const data = await getTablaPosiciones();

    return (
      <main className="min-h-screen bg-gray-100 px-4 py-8">
        {data.ok && data.tabla ? (
          <TablaResultados tabla={data.tabla} />
        ) : (
          <div className="mx-auto max-w-md rounded-2xl bg-white p-6 text-center shadow-lg">
            <h1 className="text-xl font-bold text-gray-900">
              Resultados no disponibles
            </h1>
            <p className="mt-2 text-gray-600">
              {data.mensaje || "Los resultados aún no han sido publicados."}
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Volver a la quinela
          </Link>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md rounded-2xl bg-white p-6 text-center shadow-lg">
          <h1 className="text-xl font-bold text-gray-900">
            No se pudieron cargar los resultados
          </h1>
          <p className="mt-2 text-gray-600">
            Intenta nuevamente más tarde.
          </p>

          <Link
            href="/"
            className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline"
          >
            Volver
          </Link>
        </div>
      </main>
    );
  }
}