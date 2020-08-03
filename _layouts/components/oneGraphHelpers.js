import OneGraphAuth from "onegraph-auth"

export const ONE_GRAPH_APP_ID = "73a2441e-9638-496b-bf0b-b26c8c66720b"
let isSsr = false

if (typeof window === "undefined") {
  isSsr = true
}

export const auth = isSsr
  ? {
      appId: ONE_GRAPH_APP_ID,
      accessToken: () => null,
    }
  : new OneGraphAuth({
      appId: ONE_GRAPH_APP_ID,
      oneGraphOrigin: "https://serve.onegraph.com",
    })

export const currentUser = auth => {
  if (isSsr) return { loading: true, user: null, error: null }
  const accessToken = auth.accessToken()

  let decoded = null
  let error = null

  if (!!accessToken) {
    try {
      const payload = atob(accessToken.accessToken.split(".")[1])
      decoded = JSON.parse(payload)
      delete decoded["https://onegraph.com/jwt/claims"]
    } catch (e) {
      console.warn(`Error decoding OneGraph jwt for appId=${auth.appId}: `, e)
    }
  }

  return { user: decoded, error: error, loading: false }
}
