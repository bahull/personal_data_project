import React, { Component } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

import { withRouter } from "react-router-dom";

const CURRENCY = "USD";
const fromDollarToCent = amount => amount * 100;

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.successPayment = this.successPayment.bind(this);
    this.errorPayment = this.errorPayment.bind(this);
    this.onToken = this.onToken.bind(this);
  }

  successPayment(data) {
    console.log("Successful");
    this.props.history.push("/dashboard");
  }

  errorPayment(data) {
    console.log(data);
  }

  onToken(amount, description) {
    return token =>
      axios
        .post("/api/donate", {
          source: token.id,
          currency: CURRENCY,
          amount: fromDollarToCent(amount)
        })
        .then(this.successPayment)
        .catch(console.log());
  }

  render() {
    const { amount, description } = this.props;
    return (
      <StripeCheckout
        name="Raze"
        description="Donation for Raze Energy Sales Solutions"
        amount={fromDollarToCent(amount)}
        token={this.onToken(amount, description)}
        currency={CURRENCY}
        stripeKey={"pk_test_1BQt1dCV6VqbjfWEUyp8372v"}
        zipCode={true}
      />
    );
  }
}

export default withRouter(Checkout);
