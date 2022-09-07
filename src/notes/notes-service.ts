import { API_ROOT } from "../environment";

export interface Note {
  id: string;
  content: string;
}
export interface NoteRequest {
  "note-type": string;
  "notebook-id": string;
  "note-content": string;
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
  public async addNote(note: NoteRequest): Promise<Note> {
    const request = await fetch(`${API_ROOT}/note`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
      credentials: "include",
    });
    const resp = await request.json();
    console.log("add note response response", resp);
    return resp;
  }
  public async deleteNote(noteID: string): Promise<void> {
    const request = await fetch(`${API_ROOT}/note/delete`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "note-id": noteID }),
      credentials: "include",
    });
    const resp = await request.json();
    console.log("dlete note response", resp);
    return resp;
  }
}
