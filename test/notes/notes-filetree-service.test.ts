import { groupNotesAsFileTree } from "../../src/notes/notes-filetree-service";

describe("groupNotesAsFileTree", () => {
  const notes = [
    { content: "/file0", extensionProperties: { numberOfLines: "10" } },
    {
      content: "/folder1/file1",
      extensionProperties: {
        numberOfLines: "10",
        contributors: [
          {
            name: "Bob",
            numberOfChanges: 1,
            firstChangeTimestamp: 0,
            lastChangeTimestamp: 0,
          },
          {
            name: "Alice",
            numberOfChanges: 2,
            firstChangeTimestamp: 0,
            lastChangeTimestamp: 0,
          },
        ],
      },
    },
    {
      content: "/folder1/file2",
      extensionProperties: {
        numberOfLines: "10",
        contributors: [
          {
            name: "Mallory",
            numberOfChanges: 5,
            firstChangeTimestamp: 0,
            lastChangeTimestamp: 0,
          },
        ],
      },
    },
    { content: "/folder2/file1", extensionProperties: { numberOfLines: "10" } },
    { content: "/folder3/file1", extensionProperties: { numberOfLines: "10" } },
    { content: "/folder3/file2", extensionProperties: { numberOfLines: "10" } },
    { content: "/file3", extensionProperties: { numberOfLines: "10" } },
  ];

  it("should return an empty array when notes are empty", () => {
    expect(groupNotesAsFileTree([], "/")).toEqual([]);
  });

  it("should group notes by folder when current folder is root", () => {
    const result = groupNotesAsFileTree(notes, "/");
    expect(result).toHaveLength(5);
    expect(result[0].name).toBe("folder1");
    expect(result[0].isFolder).toBe(true);
    expect(result[1].name).toBe("folder2");
    expect(result[1].isFolder).toBe(true);
    expect(result[2].name).toBe("folder3");
    expect(result[2].isFolder).toBe(true);
    expect(result[3].name).toBe("file0");
    expect(result[3].isFolder).toBe(false);
    expect(result[4].name).toBe("file3");
    expect(result[4].isFolder).toBe(false);
  });

  it("should group notes by folder and subfolder when current folder is 'folder1'", () => {
    const result = groupNotesAsFileTree(notes, "/folder1");
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("file1");
    expect(result[0].numberOfLines).toBe(10);
    expect(result[0].isFolder).toBe(false);
    expect(result[1].name).toBe("file2");
    expect(result[1].numberOfLines).toBe(10);
    expect(result[1].isFolder).toBe(false);
  });

  it("should group notes by folder and subfolder when current folder is 'folder3'", () => {
    const result = groupNotesAsFileTree(notes, "/folder3");
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("file1");
    expect(result[0].numberOfLines).toBe(10);
    expect(result[0].isFolder).toBe(false);
    expect(result[1].name).toBe("file2");
    expect(result[1].numberOfLines).toBe(10);
    expect(result[1].isFolder).toBe(false);
  });

  it("should group contributors from files of the folder", () => {
    const result = groupNotesAsFileTree(notes, "/");
    expect(result).toHaveLength(5);

    const folderOneContributors = Array.from(
      result[0].contrbutorNames.values()
    );
    expect(folderOneContributors).toHaveLength(3);
    expect(folderOneContributors[0]).toBe("Bob");
    expect(folderOneContributors[1]).toBe("Alice");
    expect(folderOneContributors[2]).toBe("Mallory");
  });
});
