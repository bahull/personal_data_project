import React, { Component } from "react";
import axios from "axios";

import { Navbar, NavItem } from "react-materialize";

import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import "./Header.css";
import { updateUserPermission } from "../../ducks/reducer";

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
        console.log("Logged Out!");
        this.props.updateUserPermission(undefined);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="head-app">
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
            <ul className="nav-list" data="./../../images/razeLogo.png">
              <Link to="/dashboard">
                <li>Dashboard</li>
              </Link>
              <Link to="/donate">
                <li>Donate</li>
              </Link>
              <Link to="/">
                <li onClick={this.logout}>Logout</li>
              </Link>
            </ul>
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

export default withRouter(
  connect(mapStateToProps, { updateUserPermission })(Header)
);
