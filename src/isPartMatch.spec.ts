import { isMatch } from "./isPartMatch";

describe("isMatch", () => {
  it("should match an exact match", () => {
    expect(isMatch("/a", "/a")).toBe(true);
    expect(isMatch("/guy/a/", "/guy/a/")).toBe(true);
  });
  it("should match a prefix in a pattern", () => {
    expect(isMatch("/a/b", "/a")).toBe(true);
  });
  it("should NOT match an overly specific pattern", () => {
    expect(isMatch("/a", "/a/b")).toBe(false);
    expect(isMatch("/guy/", "/guy/a")).toBe(false);
  });
  it("should match wildcards in place", () => {
    expect(isMatch("/a", "/*")).toBe(true);
    expect(isMatch("/guy/b", "/:name/b")).toBe(true);
    expect(isMatch("/guy", "/:name")).toBe(true);
  });
});
