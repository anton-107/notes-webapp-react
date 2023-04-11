export function sortKeys(keys: string[]): string[] {
  const r = [...keys];
  r.sort((a, b) => {
    if (a === "name") {
      return -1;
    }
    if (b === "name") {
      return 1;
    }
    if (a.startsWith("first")) {
      return -1;
    }
    if (b.startsWith("first")) {
      return 1;
    }
    if (a.startsWith("last")) {
      return -1;
    }
    if (b.startsWith("last")) {
      return 1;
    }
    return a < b ? -1 : 1;
  });
  return r;
}
