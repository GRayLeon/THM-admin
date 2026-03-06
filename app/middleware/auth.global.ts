export default defineNuxtRouteMiddleware((to) => {

  const auth = useAuthStore()

  // login page
  if (to.path === '/login') {
    if (auth.isAuthenticated) {
      return navigateTo('/')
    }
    return
  }

  // 需要登入
  if (!auth.isAuthenticated) {
    return navigateTo('/login')
  }

})