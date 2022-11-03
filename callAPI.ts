export const callAPI = async (url: string, method: string, body?: any) => {
  return fetch(url, {
      method: method,
      headers: {
          'Content-type': 'application/json'
      },
      body: body ? JSON.stringify(body) : null
  })
}