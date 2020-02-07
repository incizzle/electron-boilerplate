import * as React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import main from "./components/main"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={main} />
      </Switch>
    </Router>
  );
}

export default App;