import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes:["/","/Read/:id","/Profile/:id"],
    ignoredRoutes:[]
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
