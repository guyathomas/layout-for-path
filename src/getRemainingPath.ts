export function getRemainingPath(initialPath: string, pattern: string) {
  const initialPathParts = initialPath.split("/");
  const patternParts = pattern.split("/");
  for (let i = 0; i < patternParts.length; i++) {
    const p = patternParts[i];
    if (p === "*" && i === patternParts.length - 1) break;
    initialPathParts.shift();
  }
  return "/" + initialPathParts.join("/");
}
