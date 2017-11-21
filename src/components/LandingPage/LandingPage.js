import React, { Component } from "react";

import Particles from "react-particles-js";

import Footers from "./../Footer/Footer";

import Header from "./../Header/Header";

import "./LandingPage.css";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="landing-body">
          <div className="landing-title">
            <Particles
              params={{
                particles: {
                  number: {
                    value: 80,
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
                      speed: 40,
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
                retina_detect: true
              }}
            />

            <div className="app-intro">
              <h3>Raze Energy Sales Solutions</h3>
              <h5>Deliver quicker. Solve better. Close faster.</h5>
              <a
                href="http://localhost:3001/login"
                id="free-trial-button"
                className="btn yellow"
              >
                Start your free trial
              </a>
            </div>
          </div>
          <div className="features">
            <h2 className="center-align">Features</h2>
            <div className="rows">
              <i className="large material-icons">pie_chart</i>
              <h5 className="">
                Quick and easy access to high-end charting capabilities
              </h5>
            </div>
            <div className="rows">
              <h5 className="">
                Ability to print custom charts with only information you want to
                show your client
              </h5>
              <i className="large material-icons">local_printshop</i>
            </div>
            <div className="rows">
              <i className="fa fa-thermometer-empty fa-5x" aria-hidden="true" />
              <h5 className="">
                High Level analysis of clients temperature dependent energy use
              </h5>
            </div>
            <div className="rows">
              <h5 className="">
                Readily access information to determine if an energy project is
                a viable and cost-effective measure to lower operation expenses
              </h5>
              <i className="fa fa-money fa-5x" aria-hidden="true" />
            </div>
          </div>
          <div className="about">
            <h2>About</h2>
          </div>
          <div className="contact center-align">
            <h2>Contact Us</h2>
          </div>
        </div>
        <Footers />
      </div>
    );
  }
}

export default LandingPage;
