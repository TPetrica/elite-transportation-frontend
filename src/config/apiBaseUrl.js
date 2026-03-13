const LOCAL_API_URL = 'http://localhost:3000/v1'

export const getApiBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim()

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '')
  }

  return LOCAL_API_URL
}
