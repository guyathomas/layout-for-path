function _isPartMatch(path: string, pattern: string) {
  if (pattern === "*") {
    return true;
  } else if (path === pattern) {
    return true;
  } else if (pattern.startsWith(":") && path) {
    return true;
  }
  return false;
}

export function isMatch(path: string, pattern: string) {
  const pathParts = path.split("/");
  const patternParts = pattern.split("/");

  if (patternParts.length > pathParts.length) return false;
  for (let i = 0; i < patternParts.length; i++) {
    if (!_isPartMatch(pathParts[i], patternParts[i])) return false;
  }

  return true;
}

