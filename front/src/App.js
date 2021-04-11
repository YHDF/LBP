import React from 'react';
import './App.css';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Category from './pages/Category';
import Provider from './pages/Provider';
import Home from "./pages/Home";
import Navbar from './localComponents/Navbar'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSignedUp: false // <-- initialize the signup state as false
    }
  }
  componentWillMount() {
    axios.get('http://localhost:5000/users/checkauthentification')
      .then(res => {
        if (res.data.message === "Not Authenticated") {
          this.isSignedUp = false
          window.location.replace('http://localhost:5000/')
        } else if (res.data.message === "Authenticated") {
          this.isSignedUp = true
        }
        console.log(this.isSignedUp)
        this.setState({ isSignedUp: this.isSignedUp })
      })
  }

  render() {
    if (this.state.isSignedUp) {
      return (
        <Router>
          <div style={{ height: "100%", margin: "0" }}>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/category" component={Category} />
            <Route exact path="/provider" component={Provider} />
          </div>
        </Router>
      )
    }
    else {
      return <p></p>
    }




  }
}


