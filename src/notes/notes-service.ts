import { API_ROOT } from "../environment";

type NoteType = "note" | "notes-container";

export interface Note {
  id: string;
  content: string;
  type: { type: NoteType };
  notebookID: string;
  extensionProperties: { section: string | null };
}
export interface NoteRequest {
  "note-type": NoteType;
  "notebook-id": string;
  "note-content": string;
  "note-section": string;
}
export interface EditNoteRequest extends NoteRequest {
  "note-id": string;
}
export interface UpdateNoteSectionRequest {
  "note-id": string;
  "note-section": string;
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
    console.log("add note response", resp);
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
  public async editNote(note: EditNoteRequest): Promise<Note> {
    const request = await fetch(`${API_ROOT}/note/${note["note-id"]}/edit`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
      credentials: "include",
    });
    const resp = await request.json();
    console.log("edit note response", resp);
    return resp;
  }
  public async moveNoteToSection(
    note: UpdateNoteSectionRequest
  ): Promise<Note> {
    const request = await fetch(`${API_ROOT}/note/${note["note-id"]}/edit`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
      credentials: "include",
    });
    const resp = await request.json();
    console.log("moveNoteToSection response", resp);
    return resp;
  }
}
