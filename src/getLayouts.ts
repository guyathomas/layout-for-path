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

// const layouts: LayoutSpec[] = [
//   {
//     pattern: "/authentication",
//     children: [
//       {
//         pattern: "/login",
//         template: "GuestGuard",
//       },
//       {
//         pattern: "/register",
//         template: "GuestGuard",
//       },
//       {
//         pattern: "/:user/profile", // this doesn't actually exist, but i need to make sure i test this case
//         template: "ProfileTemplate",
//       },
//     ],
//   },
//   {
//     pattern: "/blog",
//     template: "BlogLayout",
//   },
//   {
//     pattern: "/dashboard",
//     template: `
//       <AuthGuard>
//         <DashboardLayout />
//       </AuthGuard>`,
//   },
//   {
//     pattern: "/docs",
//     template: "DocsLayout",
//   },
//   {
//     pattern: "/*", // Everything else should get MainLayout
//     template: "MainLayout",
//     children: [
//       {
//         pattern: "/", // this doesn't actually exist, but i need to make sure i test this case
//         template: "TestRootPatternLayout",
//       },
//       {
//         pattern: "/browse", // is this /browse?? I think so
//         template: "BrowseLayout",
//       },
//     ],
//   },
// ];

// console.log(
//   expect(reducelayouts("/authentication", templates)).toStringifyBe([])
// );
// console.log(
//   expect(
//     reduceTemplates("/authentication/login-unguarded", templates)
//   ).toStringifyBe([])
// );
// console.log(
//   expect(reduceTemplates("/authentication/login", templates)).toStringifyBe([
//     "GuestGuard",
//   ])
// );
// console.log(
//   expect(reduceTemplates("/catchall-route", templates)).toStringifyBe([
//     "MainLayout",
//   ])
// );
// console.log(
//   expect(reduceTemplates("/", templates)).toStringifyBe([
//     "MainLayout",
//     "TestRootPatternLayout",
//   ])
// );
// console.log(
//   expect(reduceTemplates("/browse", templates)).toStringifyBe([
//     "MainLayout",
//     "BrowseLayout",
//   ])
// );
// console.log(
//   expect(
//     reduceTemplates("/authentication/guy/profile", templates)
//   ).toStringifyBe(["ProfileTemplate"])
// );
