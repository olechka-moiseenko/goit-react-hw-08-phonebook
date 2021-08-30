import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import authSelectors from "./redux/slices/authentication/auth-selectors";
import React from "react";

export default function PublicRoute({
  children,
  restricted = false,
  redirectTo = "/",
  ...routeProps
}) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;

  return (
    <Route {...routeProps}>
      {shouldRedirect ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
}
