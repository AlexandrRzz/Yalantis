import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Employees from "./components/employees/employees";
import Home from "./components/home/home";

function App() {
  return (
    <Router>
      <div className="App"></div>
      <Switch>
        <Route exact path="/employees" component={Employees} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
