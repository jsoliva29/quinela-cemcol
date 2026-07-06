"use client";

import { useEffect, useState } from "react";
import EncabezadoPartido from "@/components/EncabezadoPartido";
import type { PartidoActivo } from "@/types/quinela";
import { enviarParticipacion } from "@/lib/api";

type Props = {
  partido: PartidoActivo;
};

export default function FormularioQuinela({ partido }: Props) {
  const [nombre, setNombre] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const nombreGuardado = localStorage.getItem("quinela_nombre");
      const tokenGuardado = localStorage.getItem("quinela_token");

      if (nombreGuardado) setNombre(nombreGuardado);
      if (tokenGuardado) setToken(tokenGuardado);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  function actualizarRespuesta(codigo: string, valor: string) {
    setRespuestas((prev) => ({
      ...prev,
      [codigo]: valor,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!nombre.trim()) {
      setMensaje("Ingrese su nombre.");
      return;
    }

    setEnviando(true);
    setMensaje("");

    try {
      const data = await enviarParticipacion({
        partido_id: partido.id,
        token,
        nombre: nombre.trim(),
        respuestas,
      });

      if (data.ok && data.token) {
        localStorage.setItem("quinela_nombre", nombre.trim());
        localStorage.setItem("quinela_token", data.token);
        setToken(data.token);
      }

      setMensaje(data.mensaje || "Participación enviada.");
    } catch {
      setMensaje("Ocurrió un error enviando la participación.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-[#2C2C2C] bg-[#111111] p-6 shadow-2xl shadow-black">
      <EncabezadoPartido partido={partido} />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1 block text-sm font-bold text-neutral-200">
            Tu nombre
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full rounded-xl border border-[#3A3A3A] bg-[#080808] px-4 py-3 text-white outline-none transition placeholder:text-neutral-600 focus:border-[#FFCD11] focus:ring-2 focus:ring-[#FFCD11]/20"
            placeholder="Ejemplo: Carlos"
          />
        </div>

        {partido.preguntas.map((pregunta) => (
          <div key={pregunta.codigo}>
            <label className="mb-1 block text-sm font-bold text-neutral-200">
              {pregunta.texto}
              <span className="ml-2 text-xs text-[#FFCD11]">
                {pregunta.puntaje} pts
              </span>
            </label>

            {pregunta.tipo === "OPCION" && (
              <select
                value={respuestas[pregunta.codigo] || ""}
                onChange={(e) =>
                  actualizarRespuesta(pregunta.codigo, e.target.value)
                }
                className="w-full rounded-xl border border-[#3A3A3A] bg-[#080808] px-4 py-3 text-white outline-none transition focus:border-[#FFCD11] focus:ring-2 focus:ring-[#FFCD11]/20"
              >
                <option value="">Seleccione una opción</option>
                {(pregunta.opciones || []).map((opcion) => (
                  <option key={opcion} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </select>
            )}

            {pregunta.tipo === "NUMERO" && (
              <input
                type="number"
                min="0"
                value={respuestas[pregunta.codigo] || ""}
                onChange={(e) =>
                  actualizarRespuesta(pregunta.codigo, e.target.value)
                }
                className="w-full rounded-xl border border-[#3A3A3A] bg-[#080808] px-4 py-3 text-white outline-none transition placeholder:text-neutral-600 focus:border-[#FFCD11] focus:ring-2 focus:ring-[#FFCD11]/20"
                placeholder="0"
              />
            )}

            {pregunta.tipo === "TEXTO" && (
              <input
                type="text"
                value={respuestas[pregunta.codigo] || ""}
                onChange={(e) =>
                  actualizarRespuesta(pregunta.codigo, e.target.value)
                }
                className="w-full rounded-xl border border-[#3A3A3A] bg-[#080808] px-4 py-3 text-white outline-none transition placeholder:text-neutral-600 focus:border-[#FFCD11] focus:ring-2 focus:ring-[#FFCD11]/20"
                placeholder="Escribe tu respuesta"
              />
            )}

            {pregunta.tipo === "BOOLEANO" && (
              <select
                value={respuestas[pregunta.codigo] || ""}
                onChange={(e) =>
                  actualizarRespuesta(pregunta.codigo, e.target.value)
                }
                className="w-full rounded-xl border border-[#3A3A3A] bg-[#080808] px-4 py-3 text-white outline-none transition focus:border-[#FFCD11] focus:ring-2 focus:ring-[#FFCD11]/20"
              >
                <option value="">Seleccione una opción</option>
                <option value="SI">Sí</option>
                <option value="NO">No</option>
              </select>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-xl bg-[#FFCD11] px-4 py-3 font-black tracking-wide text-black uppercase shadow-lg shadow-[#FFCD11]/10 transition hover:bg-[#E8B900] focus:ring-2 focus:ring-[#FFCD11] focus:ring-offset-2 focus:ring-offset-[#111111] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {enviando ? "Enviando..." : "Enviar predicción"}
        </button>

        {mensaje && (
          <div className="rounded-xl border border-[#3A3A3A] bg-[#080808] p-3 text-center text-sm text-neutral-300">
            {mensaje}
          </div>
        )}
      </form>
    </div>
  );
}
