import { useSnapshot } from 'valtio';
import { RouteProps, Route, Redirect } from 'react-router-dom';

import { state } from 'state';

const ProtectedRoute = (props: RouteProps): JSX.Element => {
  const snap = useSnapshot(state);
  return snap.isWalletConnected ? <Route {...props} /> : <Redirect to="/" />;
};

export default ProtectedRoute;
