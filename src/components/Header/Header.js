import React, { Component } from "react";
import axios from "axios";

import { Navbar, NavItem } from "react-materialize";

import { connect } from "react-redux";

import razeLogo from "./../../images/razeLogo.png";

import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);

    this.goLogin = this.goLogin.bind(this);
    this.logout = this.logout.bind(this);
  }

  goLogin() {
    window.location.href = "http://localhost:3001/login";
  }

  logout() {
    axios
      .get("/api/logout")
      .then(response => {
        console.log("logged Out");
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="head-app">
        {/* <header className="App-header">
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
          <h1 className="App-title">Raze Energy Solutions</h1>
          <Button waves="light" className="login" onClick={this.goLogin}>
            Login
          </Button>
        </header> */}
        {this.props.access === undefined && (
          <Navbar className="navbar" brand="Raze" right>
            <NavItem className="" href="#features">
              Features
            </NavItem>
            <NavItem href="#contact">Contact Us</NavItem>
            <NavItem href="http://localhost:3001/login">Login/Register</NavItem>
          </Navbar>
        )}
        {this.props.access === true || this.props.access === false ? (
          <Navbar className="navbar" brand="Raze" right>
            <NavItem href="/dashboard">Dashboard</NavItem>
            <NavItem href="/donate">Donate</NavItem>
            <NavItem href="/">Logout</NavItem>
          </Navbar>
        ) : (
            ""
          )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Header);
