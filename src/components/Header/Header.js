import React, { Component } from "react";
import axios from "axios";

import { Navbar, NavItem } from "react-materialize";



import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom'

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
          // <nav>
          //   <div class="nav-wrapper">
          //     <a href="#!" class="brand-logo">Logo</a>
          //     <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
          //     <ul class="right hide-on-med-and-down">
          //       <li><a href="sass.html">Sass</a></li>
          //       <li><a href="badges.html">Components</a></li>
          //       <li><a href="collapsible.html">Javascript</a></li>
          //       <li><a href="mobile.html">Mobile</a></li>
          //     </ul>
          //     <ul class="side-nav" id="mobile-demo">
          //       <li><a href="sass.html">Sass</a></li>
          //       <li><a href="badges.html">Components</a></li>
          //       <li><a href="collapsible.html">Javascript</a></li>
          //       <li><a href="mobile.html">Mobile</a></li>
          //     </ul>
          //   </div>
          // </nav>

          // <nav>
          //   <div class="nav-wrapper">
          //     <a href="#" class="brand-logo">Logo</a>
          //     <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
          //     <ul id="nav-mobile" class="right hide-on-med-and-down">
          //       <li><Link to="/dashboard">Dashboard</Link></li>
          //       <li><Link to="/donate">Donate</Link></li>
          //       <li><Link to="/">Logout</Link></li>
          //     </ul>
          //     <ul class="side-nav" id="mobile-demo">
          //       <li><Link to="/dashboard">Dashboard</Link></li>
          //       <li><Link to="/donate">Donate</Link></li>
          //       <li><Link to="/">Logout</Link></li>
          //     </ul>
          //   </div>
          // </nav>

          <Navbar className="navbar" brand="Raze" right>

            <ul className="nav-list">
              <Link to="/dashboard"><li>Dashboard</li></Link>
              <Link to="/donate"><li>Donate</li></Link>
              <Link to="/"><li>Logout</li></Link>

            </ul>
            {/* <NavItem href="/dashboard">Dashboard</NavItem>


            <NavItem href="/">Logout</NavItem> */}
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

export default withRouter(connect(mapStateToProps)(Header));
