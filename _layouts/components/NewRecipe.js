import React, { useContext } from "react"
import { useFormik } from "formik"
import { AuthProvider, AuthContext } from "react-onegraph"

const APP_ID = "961b2d5a-83e1-4835-b5b9-c10e983efde6"

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
  return (
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
  )
}

export default SignupForm
