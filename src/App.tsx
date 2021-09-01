import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { GlobalStyles } from 'components/common/styles/GlobalStyles';

import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import ProtectedRoute from 'components/ProtectedRoute';

import Phantom from 'components/Phantom';
import Landing from 'containers/Landing';

const Proposal = React.lazy(() => import('containers/Proposal'));
const SendNFTRing = React.lazy(() => import('containers/SendNFTRing'));

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Navbar />
      <React.Suspense fallback={null}>
        <Router>
          <Phantom />
          <Switch>
            <Route exact path="/" component={Landing} />
            <ProtectedRoute exact path="/proposal" component={Proposal} />
            <ProtectedRoute exact path="/send-nft-ring" component={SendNFTRing} />
          </Switch>
        </Router>
      </React.Suspense>
      <Footer />
    </React.Fragment>
  );
};

export default App;
