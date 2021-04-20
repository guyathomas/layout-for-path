import React from "react";
import { getLayouts } from "./getLayouts";
import { LayoutSpec } from "./types";

interface LayoutForPathProps {
  children: React.ReactNode;
  path: string;
  layoutSpec: LayoutSpec[];
}

export const LayoutForPath: React.FC<LayoutForPathProps> = ({
  children,
  layoutSpec,
  path,
}) =>
  React.useMemo(
    () =>
      getLayouts(path, layoutSpec).reduceRight(
        (acc, Layout) => <Layout>{acc}</Layout>,
        <>{children}</>
      ),
    [path]
  );
