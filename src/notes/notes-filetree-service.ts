import { NoteContent } from "./notes-service";

interface HasContent {
  content: NoteContent;
}

interface FileEntry {
  name: string;
  isFolder: boolean;
}

export function groupNotesAsFileTree(
  notes: HasContent[],
  currentFolder: string
): FileEntry[] {
  const fileEntries: Record<string, FileEntry> = {};

  notes
    .filter((n) => n.content.startsWith(currentFolder))
    .forEach((n) => {
      const parts = n.content.substring(currentFolder.length).split("/");
      const fileName =
        currentFolder.length > 1 && parts.length > 1 ? parts[1] : parts[0];
      const existingEntry = fileEntries[fileName];
      if (existingEntry) {
        existingEntry.isFolder = true;
      } else {
        fileEntries[fileName] = {
          name: fileName,
          isFolder: parts.findIndex((x) => x === fileName) !== parts.length - 1,
        };
      }
    });

  return Object.values(fileEntries);
}
