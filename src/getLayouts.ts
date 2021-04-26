import { getRemainingPath } from "./getRemainingPath";
import { isMatch } from "./isPartMatch";
import { Layout, LayoutSpec } from "./types";
import { isDefined } from "./utils";

export function getLayouts(
  path: string,
  layoutSpec: LayoutSpec[],
  currentLayouts: Layout[] = []
): Layout[] {
  const matchingSpec = layoutSpec.find((spec) => isMatch(path, spec.pattern));

  if (!matchingSpec) return currentLayouts;

  const childLayouts = matchingSpec.children
    ? getLayouts(
        getRemainingPath(path, matchingSpec.pattern),
        matchingSpec.children
      )
    : [];

  return [...currentLayouts, matchingSpec.layout, ...childLayouts].filter(
    isDefined
  );
}
