"use client";

import { useEffect, useState } from "react";
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
    const nombreGuardado = localStorage.getItem("quinela_nombre");
    const tokenGuardado = localStorage.getItem("quinela_token");

    if (nombreGuardado) setNombre(nombreGuardado);
    if (tokenGuardado) setToken(tokenGuardado);
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
    } catch (error) {
      setMensaje("Ocurrió un error enviando la participación.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {partido.nombre_evento}
        </h1>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-xl border p-4">
            {partido.equipo1.bandera && (
              <img
                src={partido.equipo1.bandera}
                alt={partido.equipo1.nombre}
                className="mx-auto mb-2 h-12 w-12 rounded-full object-cover"
              />
            )}
            <p className="font-semibold">{partido.equipo1.nombre}</p>
          </div>

          <div className="rounded-xl border p-4">
            {partido.equipo2.bandera && (
              <img
                src={partido.equipo2.bandera}
                alt={partido.equipo2.nombre}
                className="mx-auto mb-2 h-12 w-12 rounded-full object-cover"
              />
            )}
            <p className="font-semibold">{partido.equipo2.nombre}</p>
          </div>
        </div>
      </div>

      {!partido.esta_abierto ? (
        <div className="rounded-xl bg-yellow-50 p-4 text-center text-yellow-800">
          Las predicciones no están abiertas en este momento.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Tu nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Ejemplo: Carlos"
            />
          </div>

          {partido.preguntas.map((pregunta) => (
            <div key={pregunta.codigo}>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                {pregunta.texto}
                <span className="ml-2 text-xs text-gray-400">
                  {pregunta.puntaje} pts
                </span>
              </label>

              {pregunta.tipo === "OPCION" && (
                <select
                  value={respuestas[pregunta.codigo] || ""}
                  onChange={(e) =>
                    actualizarRespuesta(pregunta.codigo, e.target.value)
                  }
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
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
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
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
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                  placeholder="Escribe tu respuesta"
                />
              )}

              {pregunta.tipo === "BOOLEANO" && (
                <select
                  value={respuestas[pregunta.codigo] || ""}
                  onChange={(e) =>
                    actualizarRespuesta(pregunta.codigo, e.target.value)
                  }
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
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
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {enviando ? "Enviando..." : "Enviar predicción"}
          </button>

          {mensaje && (
            <div className="rounded-xl bg-gray-100 p-3 text-center text-sm text-gray-700">
              {mensaje}
            </div>
          )}
        </form>
      )}
    </div>
  );
}