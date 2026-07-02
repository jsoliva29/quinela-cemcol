import type {
    PartidoActivo,
    ParticipacionPayload,
    ParticipacionResponse,
    TablaResponse,
  } from "@/types/quinela";
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  function getApiUrl() {
    if (!API_URL) {
      throw new Error("Falta configurar NEXT_PUBLIC_API_URL en .env.local");
    }
  
    return API_URL;
  }
  
  export async function getPartidoActivo(): Promise<PartidoActivo> {
    const response = await fetch(`${getApiUrl()}/api/partido-activo/`, {
      cache: "no-store",
    });
  
    if (!response.ok) {
      throw new Error("No se pudo obtener el partido activo.");
    }
  
    return response.json();
  }
  
  export async function enviarParticipacion(
    payload: ParticipacionPayload
  ): Promise<ParticipacionResponse> {
    const response = await fetch(`${getApiUrl()}/api/participar/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(payload),
    });
  
    return response.json();
  }
  
  export async function getTablaPosiciones(): Promise<TablaResponse> {
    const response = await fetch(`${getApiUrl()}/api/tabla-posiciones/`, {
      cache: "no-store",
    });
  
    return response.json();
  }