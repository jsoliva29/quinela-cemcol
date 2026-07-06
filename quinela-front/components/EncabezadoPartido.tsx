import type { PartidoActivo } from "@/types/quinela";

type Props = {
  partido: PartidoActivo;
};

export default function EncabezadoPartido({ partido }: Props) {
  return (
    <div className="mb-6 text-center">
      <div className="mb-4 inline-flex items-center gap-2 bg-[#FFCD11] px-3 py-1.5 text-[0.65rem] font-black tracking-[0.18em] text-black uppercase">
        <span className="h-2 w-2 bg-black" aria-hidden="true" />
        Evento exclusivo Caterpillar
      </div>

      <h1 className="text-2xl font-black tracking-tight text-white">
        {partido.nombre_evento}
      </h1>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-[#353535] bg-[#090909] p-4">
          {partido.equipo1.bandera && (
            <img
              src={partido.equipo1.bandera}
              alt={partido.equipo1.nombre}
              className="mx-auto mb-2 h-12 w-12 rounded-full border border-[#FFCD11]/50 object-cover"
            />
          )}
          <p className="font-bold text-white">{partido.equipo1.nombre}</p>
        </div>

        <div className="rounded-xl border border-[#353535] bg-[#090909] p-4">
          {partido.equipo2.bandera && (
            <img
              src={partido.equipo2.bandera}
              alt={partido.equipo2.nombre}
              className="mx-auto mb-2 h-12 w-12 rounded-full border border-[#FFCD11]/50 object-cover"
            />
          )}
          <p className="font-bold text-white">{partido.equipo2.nombre}</p>
        </div>
      </div>
    </div>
  );
}
