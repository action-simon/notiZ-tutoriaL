import { clerkMiddleware } from "@clerk/nextjs/server";
import { middleware as i18nMiddleware } from "@/lib/i18n";

export async function middleware(request: any) {
  const lang = i18nMiddleware.detectLanguage(request);
  const response = i18nMiddleware.getResponse(request, lang);
  return response;
}

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
