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
const SuccessfullyMinted = React.lazy(() => import('containers/SuccessfullyMinted'));
const AcceptRingRequest = React.lazy(() => import('containers/AcceptRingRequest'));
const AcceptingRing = React.lazy(() => import('containers/AcceptingRing'));
const Engagement = React.lazy(() => import('containers/Engagement'));

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyles />
      <React.Suspense fallback={null}>
        <Router>
          <Phantom />
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <ProtectedRoute exact path="/proposal" component={Proposal} />
            <ProtectedRoute exact path="/send-nft-ring" component={SendNFTRing} />
            <ProtectedRoute exact path="/successful-mint" component={SuccessfullyMinted} />
            <Route exact path="/accept-ring-request" component={AcceptRingRequest} />
            <ProtectedRoute exact path="/accepting-ring" component={AcceptingRing} />
            <Route exact path="/engagement" component={Engagement} />
          </Switch>
          <Footer />
        </Router>
      </React.Suspense>
    </React.Fragment>
  );
};

export default App;
