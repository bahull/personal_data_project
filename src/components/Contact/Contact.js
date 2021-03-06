import React, { Component } from "react";

import { Row, Col } from "react-materialize";

import "./Contact.css";

class Contact extends Component {
  render() {
    return (
      <div id="contact-background">
        <div id="contact" className="features">
          <h2 id="contact-header" className="center-align">
            Contact Us
          </h2>
          <h5 className="contact-small-text">
            We at Raze hope that you were able to benefit from our software and
            were able to easily use it. If you have any questions, or
            suggestions, please reach out to us as we love hearing from our
            clients! Below are out most used social media sites!
          </h5>
          <div className="rows spaced-rows" />
          <Row>
            <Col s={4} className="grid-example">
              <a
                className="grey-text text-lighten-3 fa fa-linkedin fa-4x"
                href="https://www.linkedin.com/in/bryce-hull-9a9429123/"
              >
                {" "}
              </a>
            </Col>

            <Col s={4} className="grid-example">
              <a
                className="grey-text text-lighten-3 fa fa-twitter fa-4x"
                href="https://twitter.com/BryceHull1"
              >
                {" "}
              </a>
            </Col>
            <Col s={4} className="grid-example">
              <a
                className="grey-text text-lighten-3 fa fa-github fa-4x"
                href="https://github.com/bahull"
              >
                {" "}
              </a>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Contact;
