import React, { useContext } from "react"
import { useFormik } from "formik"
import { auth, currentUser } from "./oneGraphHelpers"

const LoginButton = ({ auth, service, isLoggedIn, onUpdated }) => {
  return (
    <button
      key={service}
      onClick={async () => {
        await auth.login(service)
        onUpdated(auth)
      }}
      disabled={isLoggedIn}
    >
      <h3>
        {!!isLoggedIn ? " ✓" : ""} {service} &rarr;
      </h3>
    </button>
  )
}

const SignupForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const { login } = useContext(AuthContext)

  login("github")

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  const [accessToken, setAccessToken] = React.useState(
    () => auth.accessToken() && auth.accessToken().accessToken
  )
  const resetAccessToken = auth => {
    const newAccessToken = auth.accessToken() && auth.accessToken().accessToken
    setAccessToken(newAccessToken)
  }

  const session = React.useMemo(
    () => {
      if (!!accessToken) {
        const authGuardianData = currentUser(auth)
        return authGuardianData.user
      }
    },
    // Reset session data if the accessToken changes
    [accessToken]
  )

  const isLoggedIntoGitHub = !!session?.user?.gitHubId
  const isLoggedIntoTwitter = !!session?.user?.twitterId

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <button type="submit">Submit</button>
      </form>
      <LoginButton
        auth={auth}
        service="github"
        onUpdated={resetAccessToken}
        isLoggedIn={isLoggedIntoGitHub}
      />
      <LoginButton
        auth={auth}
        service="twitter"
        onUpdated={resetAccessToken}
        isLoggedIn={isLoggedIntoTwitter}
      />
      <button
        onClick={() => {
          auth.destroy()
          resetAccessToken(auth)
        }}
      >
        Log out all
      </button>
      {
        // Debug area
      }
      <p>
        Twitter:{" "}
        {isLoggedIntoTwitter ? (
          <>
            {session?.user?.twitterScreenname} ({session?.user?.twitterId})
          </>
        ) : null}
        <br />
        GitHub:{" "}
        {isLoggedIntoGitHub ? (
          <>
            {session?.user?.gitHubLogin} ({session?.user?.gitHubId})
          </>
        ) : null}
      </p>
    </>
  )
}

export default SignupForm
