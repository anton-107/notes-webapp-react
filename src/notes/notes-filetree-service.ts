import { ExtensionProperties, NoteContent } from "./notes-service";

interface HasContentAndExtensionProperties {
  content: NoteContent;
  extensionProperties?: ExtensionProperties;
}

export interface FileEntry {
  name: string;
  isFolder: boolean;
  extensionProperties?: ExtensionProperties;
}

export function groupNotesAsFileTree(
  notes: HasContentAndExtensionProperties[],
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
          extensionProperties: { ...n.extensionProperties },
        };
      }
    });

  const r = Object.values(fileEntries);

  r.sort((a, b) => {
    if (a.isFolder && !b.isFolder) {
      return -1;
    }
    if (!a.isFolder && b.isFolder) {
      return 1;
    }
    return a.name.localeCompare(b.name);
  });

  return r;
}
