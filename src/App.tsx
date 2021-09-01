import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { GlobalStyles } from 'components/common/styles/GlobalStyles';

import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

import Landing from 'containers/Landing';

const Proposal = React.lazy(() => import('containers/Proposal'));

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Navbar />
      <React.Suspense fallback={null}>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/proposal" component={Proposal} />
          </Switch>
        </Router>
      </React.Suspense>
      <Footer />
    </React.Fragment>
  );
};

export default App;
