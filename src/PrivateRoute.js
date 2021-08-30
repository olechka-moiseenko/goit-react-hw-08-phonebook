import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import authSelectors from "./redux/slices/authentication/auth-selectors";

export default function PrivateRoute({
  children,
  redirectTo = "/login",
  ...routeProps
}) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <Route {...routeProps}>{isLoggedIn ? children : <Redirect to="/" />}</Route>
  );
}
