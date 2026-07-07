import { observer } from "mobx-react";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import env from "~/env";
import useStores from "~/hooks/useStores";
import { logoutPath } from "~/utils/routeHelpers";

const Logout = () => {
  const { auth } = useStores();

  useEffect(() => {
    void auth.logout({
      userInitiated: true,
      clearCache: true,
    });
  }, [auth]);

  // This scene is rendered outside of `Authenticated`, so the redirect to the
  // provider logout URI must be performed here once the local session is
  // cleared.
  useEffect(() => {
    if (auth.logoutRedirectUri) {
      window.location.href = auth.logoutRedirectUri;
    }
  }, [auth.logoutRedirectUri]);

  if (env.OIDC_LOGOUT_URI || auth.lastSignedIn === "oidc") {
    return null; // user will be redirected to logout URI after logout
  }
  return <Redirect to={logoutPath()} />;
};

export default observer(Logout);
