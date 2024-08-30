import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  if (localStorage.getItem('userToken') !== null) {
    return (
      // eslint-disable-next-line react/prop-types
      props.children
    )
  } else {
    return (
      <Navigate to={'/login'}></Navigate>
    )
  }
}
