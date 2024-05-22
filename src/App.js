import React from "react";
import "./styles.css";
import Navbar from "./compenents/Navbar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// PAGES
import Validacion from "./pages/Validacion";
import Signup from "./pages/Signup";
import Login from './pages/Login';






export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
        <Route path="/" exact component={Login} />
         <Route path="/signup"  component={Signup} />

          <Route path="/validacion"  component={Validacion} />
       
          
          
        </Switch>
      </Router>
    </div>
  );
}


