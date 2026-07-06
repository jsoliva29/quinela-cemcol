import type { TablaItem } from "@/types/quinela";

type Props = {
  tabla: TablaItem[];
  mensajeVacio?: string;
  className?: string;
};

export default function TablaResultados({
  tabla,
  mensajeVacio = "Aún no hay resultados.",
  className = "",
}: Props) {
  return (
    <div
      className={`mx-auto max-w-2xl rounded-2xl border border-[#2C2C2C] bg-[#111111] p-6 shadow-2xl shadow-black ${className}`}
    >
      <div className="mx-auto mb-4 h-1 w-16 bg-[#FFCD11]" />
      <h1 className="mb-6 text-center text-2xl font-black text-white">
        Tabla de posiciones
      </h1>

      <div className="overflow-hidden rounded-xl border border-[#343434]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#FFCD11] text-black">
            <tr>
              <th className="px-4 py-3 font-black">#</th>
              <th className="px-4 py-3 font-black">Nombre</th>
              <th className="px-4 py-3 text-right font-black">Puntos</th>
            </tr>
          </thead>
          <tbody>
            {tabla.map((item) => (
              <tr
                key={`${item.posicion}-${item.nombre}`}
                className={
                  item.ganador
                    ? "border-t border-[#343434] bg-[#FFCD11]/10 text-white"
                    : "border-t border-[#343434] bg-[#090909] text-neutral-300"
                }
              >
                <td className="px-4 py-3 font-bold">
                  {item.ganador ? `🏆 ${item.posicion}` : item.posicion}
                </td>
                <td className="px-4 py-3">{item.nombre}</td>
                <td className="px-4 py-3 text-right font-bold">
                  {item.puntaje_total}
                </td>
              </tr>
            ))}

            {tabla.length === 0 && (
              <tr className="border-t border-[#343434] bg-[#090909]">
                <td
                  colSpan={3}
                  className="px-4 py-6 text-center text-neutral-500"
                >
                  {mensajeVacio}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
