import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CardSection";

import { Button } from "react-bootstrap";
class CheckoutForm extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault();

    const { stripe, elements } = this.props;
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token);
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <CardSection />
          {/* <button disabled={!this.props.stripe} className="btn-pay">
            Buy Now
          </button> */}

          <Button disabled={!this.props.stripe} className="btn-pay bg-success">
            Proceed
          </Button>
        </form>
      </div>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
