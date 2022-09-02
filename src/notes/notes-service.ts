import { API_ROOT } from "../environment";

export interface Note {
  id: string;
  content: string;
}

export class NotesService {
  public async listAllForNotebook(notebookID: string): Promise<Note[]> {
    const request = await fetch(`${API_ROOT}/notebook/${notebookID}/note`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const resp = await request.json();
    return resp.notes;
  }
}
