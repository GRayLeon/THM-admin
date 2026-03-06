export default defineNuxtPlugin(() => {

  const auth = useAuthStore()

  const api = $fetch.create({

    async onRequest({ options }) {
      const token = auth.accessToken
      if (!token) return

      options.headers = new Headers(options.headers)
      options.headers.set('Authorization', `Bearer ${token}`)
    },

    async onResponseError({ request, options, response }) {

      if (response.status === 401) {
        try {
          await auth.refreshAccessToken()

          const token = auth.accessToken
          options.headers = new Headers(options.headers)
          options.headers.set('Authorization', `Bearer ${token}`)

          return await $fetch(request, options as any)

        } catch (err) {
          await auth.logout()
        }
      }

    }
  })

  return {
    provide: {
      api
    }
  }
})