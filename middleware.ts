import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protctedRoutes = createRouteMatcher([
  "/",
  "/upcoming",
  "/previous",
  "/recording",
  "personal-space",
  "/meeting(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (protctedRoutes(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
