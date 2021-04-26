# Layout For Path
A declarative, `react-router` style API for wrapping your application in layouts, depending on the current route.

## Core Principles
* The first match in the array will be applied
* Nested routes will recursively be applied ( top level layouts being provided at the outermost level )
* A match doesn't need to have a `layout` element, and can serve as matching a prefix for child routes
* Wildcard routes `/*`, param routes `/:uuid`, and exact match routes `/driver/name` are supported

## Example
```javascript

import { useRouter } from "next/router";
import LayoutForPage, { LayoutSpec } from "@guyathomas/layout-for-path";
/* ... Layout Imports Omitted ... */

const layouts: LayoutSpec[] = [
  {
    pattern: "/dashboard", // my-app.com/dashboard/* would be wrapped in this
    layout: ({ children }) => (
      <AuthGuard>
        <DashboardLayout>{children}</DashboardLayout>
      </AuthGuard>
    )
  },
  {
    pattern: "/*", // Everything that doesn't match my-app.com/dashboard will render <MainLayout>{children}</MainLayout>
    layout: MainLayout,
    children: [
      {
        pattern: "/", // my-app.com/ will render <MainLayout><HomePageLayout>{children}</HomePageLayout></MainLayout>
        layout: HomePageLayout,
      },
      {
        pattern: "/browse/*", // my-app.com/browse/some-route will render <MainLayout><BrowseLayout>{children}</BrowseLayout></MainLayout>
        layout: BrowseLayout,
      },
    ],
  },
];


const AppLayout: React.FC = ({ children }) => {
  const router = useRouter();
  return (
    <LayoutForPage path={router.asPath} layoutSpec={layoutSpec}>
      {children}
    </LayoutForPage>
  );
};
```
