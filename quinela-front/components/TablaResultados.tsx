import type { TablaItem } from "@/types/quinela";

type Props = {
  tabla: TablaItem[];
};

export default function TablaResultados({ tabla }: Props) {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
        Tabla de posiciones
      </h1>

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3 text-right">Puntos</th>
            </tr>
          </thead>
          <tbody>
            {tabla.map((item) => (
              <tr
                key={`${item.posicion}-${item.nombre}`}
                className={item.ganador ? "bg-green-50" : "bg-white"}
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
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                  Aún no hay resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}