import React, { Component } from "react";
import { Footer } from "react-materialize";
import "./Footer.css";

class Footers extends Component {
  render() {
    return (
      <div className="footerBody">
        <Footer
          id="myfooter"
          copyrights="Coded by Bryce Hull"
          moreLinks={
            <a className="grey-text text-lighten-4 right" href="#top">
              Back to Top
            </a>
          }
          links={
            <ul>
              <li className="social-links">
                <a
                  className="grey-text text-lighten-3 fa fa-linkedin fa-2x"
                  href="https://www.linkedin.com/in/bryce-hull-9a9429123/"
                />
              </li>
              <li className="social-links">
                <a
                  className="grey-text text-lighten-3 fa fa-twitter fa-2x"
                  href="https://twitter.com/BryceHull1"
                />
              </li>
              <li className="social-links">
                <a
                  className="grey-text text-lighten-3 fa fa-github fa-2x"
                  href="https://github.com/bahull"
                />
              </li>
            </ul>
          }
          className="example"
        >
          <h5 className="white-text">Example Project by Bryce Hull</h5>
          <p className="grey-text text-lighten-4">
            If you have came across this site by accident, this site was coded
            as an example of my skills. This software is active and being
            utilized in the energy savings field. If you have a need for custom
            software, feel free to reach out to me through one of the social
            media links on the right.
          </p>
        </Footer>
      </div>
    );
  }
}

export default Footers;
