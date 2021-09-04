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

const StartNewMarriage = React.lazy(() => import('containers/StartNewMarriage'));
const Marriage = React.lazy(() => import('containers/Marriage'));
const Assets = React.lazy(() => import('containers/Assets'));
const AddAsset = React.lazy(() => import('containers/AddAsset'));
const ApproveAsset = React.lazy(() => import('containers/ApproveAsset'));
const Divorce = React.lazy(() => import('containers/Divorce'));

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
            <ProtectedRoute exact path="/proposal/new" component={SendNFTRing} />
            <ProtectedRoute exact path="/proposal/:proposalPubKey/created" component={SuccessfullyMinted} />
            <Route exact path="/proposal/:proposalPubKey/accept" component={AcceptRingRequest} />
            <ProtectedRoute exact path="/proposal/:proposalPubKey/accepting" component={AcceptingRing} />
            <Route exact path="/engagement/:proposalPubKey" component={Engagement} />

            <ProtectedRoute exact path="/marriage/new" component={StartNewMarriage} />
            <ProtectedRoute exact path="/marriage" component={Marriage} />
            <ProtectedRoute exact path="/assets" component={Assets} />
            <ProtectedRoute exact path="/add-asset" component={AddAsset} />
            <ProtectedRoute exact path="/approve-asset" component={ApproveAsset} />
            <ProtectedRoute exact path="/divorce" component={Divorce} />
          </Switch>
          <Footer />
        </Router>
      </React.Suspense>
    </React.Fragment>
  );
};

export default App;
