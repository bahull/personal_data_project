import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./../../logo.svg";

import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);

    this.goLogin = this.goLogin.bind(this);
  }

  goLogin() {
    window.location.href = "http://localhost:3001/login";
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
          <h1 className="App-title">Raze Energy Solutions</h1>
          <button className="login" onClick={this.goLogin}>
            Login/Register
          </button>
        </header>
      </div>
    );
  }
}

export default Header;
