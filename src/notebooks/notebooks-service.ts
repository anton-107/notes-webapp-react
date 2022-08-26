import { API_ROOT } from "../environment";

export interface Notebook {
  id: string;
  name: string;
}

export class NotebooksService {
  public async listAll(): Promise<Notebook[]> {
    const request = await fetch(`${API_ROOT}/notebook`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    console.log("[notebooks list] request", request);
    const resp = await request.json();
    console.log("[notebooks list] response", resp);

    return resp.notebooks;
  }
}
