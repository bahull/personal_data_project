import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Button, Icon, Navbar, NavItem } from "react-materialize";

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
        {/* <header className="App-header">
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
          <h1 className="App-title">Raze Energy Solutions</h1>
          <Button waves="light" className="login" onClick={this.goLogin}>
            Login
          </Button>
        </header> */}
        <Navbar className="navbar" brand="Raze" right>
          <NavItem href="#features">Features</NavItem>
          <NavItem href="#dashboard">About</NavItem>
          <NavItem href="#contact">Contact</NavItem>
          <NavItem href="http://localhost:3001/login">Login/Register</NavItem>
        </Navbar>
      </div>
    );
  }
}

export default Header;
