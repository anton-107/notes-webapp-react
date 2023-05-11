import { NoteContent } from "./notes-service";

interface HasContent {
  content: NoteContent;
}

interface FileEntry {
  name: string;
}

export function groupNotesAsFileTree(
  notes: HasContent[],
  currentFolder: string
): FileEntry[] {
  const folders: Set<string> = new Set();

  notes
    .filter((n) => n.content.startsWith(currentFolder))
    .forEach((n) => {
      const parts = n.content.substring(currentFolder.length).split("/");
      const fileName =
        currentFolder.length > 1 && parts.length > 1 ? parts[1] : parts[0];
      folders.add(fileName);
    });

  return Array.from(folders.values()).map((f) => {
    return {
      name: f,
    };
  });
}
