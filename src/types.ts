import React from "react";

export type Layout<T = {}> = React.FC<T>;

export interface LayoutSpec {
  pattern: string;
  children?: LayoutSpec[];
  layout?: Layout;
}
