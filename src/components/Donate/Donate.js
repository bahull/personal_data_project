import React, { Component } from "react";
import { connect } from "react-redux";
import Particles from "react-particles-js";
import axios from "axios";

import { withRouter } from 'react-router-dom'

import { Input, Row, Col } from "react-materialize";
import { updateAmount } from "./../../ducks/reducer";

import Header from "./../Header/Header";
import Checkout from "./../Checkout/Checkout";
import Footer from "./../Footer/Footer";
import "./Donate.css";

class Donate extends Component {
  componentDidMount() {
    axios.get("/api/me").then(response => {
      if (!response.data) {
        this.props.history.push("/");
      }
    })
  }

  render() {
    return (
      <div>
        <div id="donate-background">
          <div id="top">
            <Header />
            {/* <Particles
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
              retina_detect: false
            }}
          /> */}
            <div id="box">
              <div id="inner-box-donate">
                <h4>
                  Raze Energy Sales Solutions is able to operate because of
                  donations by generous users such as yourself.
                </h4>
                <h5 id="small-text-donate">
                  If you have enjoyed our software and would like to enable us
                  to provide continued maintenance and support, please consider
                  donating. Thank you from the Raze team!
                </h5>
                <Input
                  className="donate-amount center-align"
                  label="Donation Amount"
                  onChange={e => this.props.updateAmount(e.target.value)}
                />
                <div className="checkout-cart center-align">
                  <Checkout amount={this.props.amount} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default withRouter(connect(mapStateToProps, { updateAmount })(Donate));
