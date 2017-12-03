import React, { Component } from "react";

import Particles from "react-particles-js";

import Header from "./../Header/Header";
import Features from "./../Features/Features";
import Contact from "./../Contact/Contact";
import Footers from "./../Footer/Footer";

import "./LandingPage.css";

import { Link } from "react-materialize";

class LandingPage extends Component {
  goLogin() {
    window.location.href = "http://localhost:3001/auth";
    console.log("hit auth");
  }
  render() {
    return (
      <div id="top">
        <Header />
        <div className="landing-body">
          <div className="landing-title">
            <Particles
              params={{
                particles: {
                  number: {
                    value: 180,
                    density: {
                      enable: true,
                      value_area: 1800
                    }
                  },
                  size: {
                    value: 4,
                    random: true,
                    anim: {
                      enable: false,
                      speed: 50,
                      size_min: 0.1,
                      sync: false
                    }
                  },
                  line_linked: {
                    enable: true,
                    distance: 100,
                    color: "#ffffff",
                    opacity: 0.8,
                    width: 1
                  },
                  move: {
                    enable: true,
                    speed: 6,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                      enable: false,
                      rotateX: 600,
                      rotateY: 1200
                    }
                  }
                },
                interactivity: {
                  detect_on: "canvas",
                  events: {
                    onhover: {
                      enable: true,
                      mode: "grab"
                    },
                    resize: true
                  }
                },
                retina_detect: false
              }}
            />

            <div className="app-intro">
              <h3>Raze Energy Sales Solutions</h3>
              <h5>Deliver quicker. Solve better. Close faster.</h5>

              {/* <a href="/login" id="free-trial-button" className="btn yellow">
                Sign up for a demo
              </a> */}
              <button
                // href="/login"
                id="free-trial-button"
                className="btn yellow"
                onClick={this.goLogin}
              >
                Sign up for a demo
              </button>
            </div>
          </div>
          <Features />
          <Contact />
        </div>
        <Footers />
      </div>
    );
  }
}

export default LandingPage;
