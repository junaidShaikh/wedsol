import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { GlobalStyles } from 'components/common/styles/GlobalStyles';

import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

import Landing from 'containers/Landing';

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
        </Switch>
      </Router>
      <Footer />
    </React.Fragment>
  );
};

export default App;
