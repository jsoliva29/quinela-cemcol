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
  requerida?: boolean;
  opciones?: string[];
};

export type PartidoActivo = {
  id: number;
  nombre_evento: string;
  estado: EstadoPartido;
  esta_abierto: boolean;
  recibe_respuestas?: boolean;
  esta_cerrado?: boolean;
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

export type MiParticipacionResponse = {
  ok: boolean;
  mensaje?: string;
  participante?: {
    nombre: string;
    token: string;
    partido_id: number;
    puntaje_total: number;
  };
  respuestas?: Record<string, string>;
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
