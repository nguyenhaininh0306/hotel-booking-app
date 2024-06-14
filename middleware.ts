import { auth, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  'hotel-details/:id',
  '/api/uploadthing',
])

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) auth().protect()
})

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
