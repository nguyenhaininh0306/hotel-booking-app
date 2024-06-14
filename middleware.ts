import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectRoute = createRouteMatcher([])

export default clerkMiddleware((auth, req) => {
  if (!auth().userId && isProtectRoute(req)) {
    // Add custom logic to run before redirecting

    return auth().redirectToSignIn()
  }
})

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
