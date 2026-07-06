import Link from "next/link";
import FormularioQuinela from "@/components/FormularioQuinela";
import PartidoCerrado from "@/components/PartidoCerrado";
import { getPartidoActivo, getTablaPosiciones } from "@/lib/api";
import type { PartidoActivo, TablaResponse } from "@/types/quinela";

async function cargarPartido(): Promise<PartidoActivo | null> {
  try {
    return await getPartidoActivo();
  } catch {
    return null;
  }
}

async function cargarResultados(): Promise<TablaResponse> {
  try {
    return await getTablaPosiciones();
  } catch {
    return {
      ok: false,
      mensaje: "No se pudo cargar la tabla de posiciones.",
    };
  }
}

export default async function HomePage() {
  const partido = await cargarPartido();

  if (!partido) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-4">
        <div className="max-w-md rounded-2xl border border-[#2C2C2C] bg-[#111111] p-6 text-center shadow-2xl shadow-black">
          <div className="mx-auto mb-4 h-1 w-16 bg-[#FFCD11]" />
          <h1 className="text-xl font-bold text-white">
            Quinela no disponible
          </h1>
          <p className="mt-2 text-neutral-400">
            No se pudo cargar la información del partido.
          </p>
        </div>
      </main>
    );
  }

  const recibeRespuestas =
    partido.recibe_respuestas ?? partido.esta_abierto;

  if (!recibeRespuestas) {
    const resultados = await cargarResultados();

    return (
      <main className="min-h-screen bg-[#050505] px-4 py-8">
        <PartidoCerrado
          partido={partido}
          tabla={resultados.tabla ?? []}
          mensajeTabla={
            resultados.ok
              ? undefined
              : resultados.mensaje ||
                "Los resultados aún no están disponibles."
          }
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8">
      <FormularioQuinela partido={partido} />

      <div className="mt-6 text-center">
        <Link
          href="/resultados"
          className="text-sm font-semibold text-[#FFCD11] transition-colors hover:text-[#FFE16A]"
        >
          Ver tabla de resultados
        </Link>
      </div>
    </main>
  );
}
