"use client";

import { useEffect, useState } from "react";
import EncabezadoPartido from "@/components/EncabezadoPartido";
import TablaResultados from "@/components/TablaResultados";
import { getMiParticipacion } from "@/lib/api";
import type { PartidoActivo, TablaItem } from "@/types/quinela";

type Props = {
  partido: PartidoActivo;
  tabla: TablaItem[];
  mensajeTabla?: string;
};

function formatearRespuesta(respuesta?: string) {
  if (!respuesta) {
    return "Sin respuesta registrada";
  }

  if (respuesta.toUpperCase() === "SI") return "Sí";
  if (respuesta.toUpperCase() === "NO") return "No";

  return respuesta;
}

export default function PartidoCerrado({
  partido,
  tabla,
  mensajeTabla,
}: Props) {
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [nombreParticipante, setNombreParticipante] = useState("");
  const [cargandoRespuestas, setCargandoRespuestas] = useState(true);
  const [mensajeRespuestas, setMensajeRespuestas] = useState("");

  useEffect(() => {
    let cancelado = false;

    const frame = requestAnimationFrame(() => {
      const token = localStorage.getItem("quinela_token");

      if (!token) {
        setMensajeRespuestas(
          "No encontramos una participación guardada en este dispositivo."
        );
        setCargandoRespuestas(false);
        return;
      }

      void getMiParticipacion(token)
        .then((data) => {
          if (cancelado) return;

          if (
            data.ok &&
            data.participante?.partido_id === partido.id
          ) {
            setRespuestas(data.respuestas ?? {});
            setNombreParticipante(data.participante?.nombre ?? "");
          } else {
            setMensajeRespuestas(
              data.mensaje ||
                "No encontramos una participación para este partido."
            );
          }
        })
        .catch(() => {
          if (!cancelado) {
            setMensajeRespuestas("No se pudieron cargar tus respuestas.");
          }
        })
        .finally(() => {
          if (!cancelado) {
            setCargandoRespuestas(false);
          }
        });
    });

    return () => {
      cancelado = true;
      cancelAnimationFrame(frame);
    };
  }, [partido.id]);

  return (
    <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-2">
      <section className="rounded-2xl border border-[#2C2C2C] bg-[#111111] p-6 shadow-2xl shadow-black">
        <EncabezadoPartido partido={partido} />

        <div className="mb-5 rounded-xl border border-[#FFCD11]/40 bg-[#FFCD11] p-4 text-center font-bold text-black">
          {partido.esta_cerrado
            ? "Las predicciones están cerradas."
            : "Las predicciones no están abiertas en este momento."}
        </div>

        <h2 className="mb-4 text-xl font-black text-white">
          {nombreParticipante
            ? `Respuestas de ${nombreParticipante}`
            : "Tus respuestas actuales"}
        </h2>

        {mensajeRespuestas && (
          <p className="mb-4 rounded-xl border border-[#2C2C2C] bg-[#080808] p-3 text-sm text-neutral-400">
            {mensajeRespuestas}
          </p>
        )}

        <div className="space-y-3">
          {partido.preguntas.map((pregunta) => (
            <div
              key={pregunta.codigo}
              className="rounded-xl border border-[#303030] bg-[#090909] p-4 transition-colors hover:border-[#FFCD11]/50"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="font-bold text-neutral-100">{pregunta.texto}</p>
                <span className="shrink-0 text-xs font-bold text-[#FFCD11]">
                  {pregunta.puntaje} pts
                </span>
              </div>
              <p className="mt-2 font-semibold text-[#FFCD11]">
                {cargandoRespuestas
                  ? "Cargando respuesta..."
                  : formatearRespuesta(respuestas[pregunta.codigo])}
              </p>
            </div>
          ))}

          {partido.preguntas.length === 0 && (
            <p className="rounded-xl border border-[#2C2C2C] bg-[#080808] p-4 text-center text-neutral-500">
              No hay preguntas disponibles.
            </p>
          )}
        </div>
      </section>

      <TablaResultados
        tabla={tabla}
        mensajeVacio={mensajeTabla}
        className="w-full"
      />
    </div>
  );
}
