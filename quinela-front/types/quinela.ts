export type EstadoPartido = "BORRADOR" | "ABIERTO" | "CERRADO" | "PUBLICADO";

export type Equipo = {
  nombre: string;
  bandera?: string | null;
};

export type Pregunta = {
  codigo: string;
  texto: string;
  tipo: "TEXTO" | "NUMERO" | "BOOLEANO" | "OPCION";
  puntaje: number;
  opciones?: string[];
};

export type PartidoActivo = {
  id: number;
  nombre_evento: string;
  estado: EstadoPartido;
  esta_abierto: boolean;
  puede_mostrar_resultados: boolean;
  equipo1: Equipo;
  equipo2: Equipo;
  preguntas: Pregunta[];
};

export type ParticipacionPayload = {
  partido_id: number;
  token?: string | null;
  nombre: string;
  respuestas: Record<string, string>;
};

export type ParticipacionResponse = {
  ok: boolean;
  token?: string;
  mensaje: string;
};

export type TablaItem = {
  posicion: number;
  nombre: string;
  puntaje_total: number;
  ganador: boolean;
};

export type TablaResponse = {
  ok: boolean;
  mensaje?: string;
  tabla?: TablaItem[];
  ganadores?: TablaItem[];
};