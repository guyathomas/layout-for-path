import { getRemainingPath } from "./getRemainingPath";

describe("getRemainingPath", () => {
  it("should match a full exact match", () => {
    expect(getRemainingPath("/a", "/a")).toBe("/");
    expect(getRemainingPath("/a/b", "/a/b")).toBe("/");
  });
  it("should return the rest of a path for a wildcard (*) at the end", () => {
    expect(getRemainingPath("/a", "/*")).toBe("/a");
    expect(getRemainingPath("/a/b/c", "/a/*")).toBe("/b/c");
  });
  it("should work with wildcards and named paths in the middle of a string", () => {
    expect(getRemainingPath("/a/zz/c/d", "/a/*/c")).toBe("/d");
    expect(getRemainingPath("/a/guy/c/d", "/a/:name/c")).toBe("/d");
  });
  it("should return the rest of a string for a found prefix", () => {
    expect(getRemainingPath("/a/b", "/a")).toBe("/b");
    expect(getRemainingPath("/a/guy/b", "/a/:name")).toBe("/b");
  });
});
