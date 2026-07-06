import Link from "next/link";
import TablaResultados from "@/components/TablaResultados";
import { getTablaPosiciones } from "@/lib/api";
import type { TablaResponse } from "@/types/quinela";

async function cargarResultados(): Promise<TablaResponse | null> {
  try {
    return await getTablaPosiciones();
  } catch {
    return null;
  }
}

export default async function ResultadosPage() {
  const data = await cargarResultados();

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-4">
        <div className="max-w-md rounded-2xl border border-[#2C2C2C] bg-[#111111] p-6 text-center shadow-2xl shadow-black">
          <div className="mx-auto mb-4 h-1 w-16 bg-[#FFCD11]" />
          <h1 className="text-xl font-bold text-white">
            No se pudieron cargar los resultados
          </h1>
          <p className="mt-2 text-neutral-400">
            Intenta nuevamente más tarde.
          </p>

          <Link
            href="/"
            className="mt-4 inline-block text-sm font-semibold text-[#FFCD11] transition-colors hover:text-[#FFE16A]"
          >
            Volver
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8">
      {data.ok && data.tabla ? (
        <TablaResultados tabla={data.tabla} />
      ) : (
        <div className="mx-auto max-w-md rounded-2xl border border-[#2C2C2C] bg-[#111111] p-6 text-center shadow-2xl shadow-black">
          <div className="mx-auto mb-4 h-1 w-16 bg-[#FFCD11]" />
          <h1 className="text-xl font-bold text-white">
            Resultados no disponibles
          </h1>
          <p className="mt-2 text-neutral-400">
            {data.mensaje || "Los resultados aún no han sido publicados."}
          </p>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-sm font-semibold text-[#FFCD11] transition-colors hover:text-[#FFE16A]"
        >
          Volver a la quinela
        </Link>
      </div>
    </main>
  );
}
