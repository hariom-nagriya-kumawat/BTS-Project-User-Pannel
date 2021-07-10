import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

import {
  FormGroup,
  FormLabel,
} from "react-bootstrap";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#303238",
      fontSize: "16px",
      fontFamily: "sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF",
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238",
      },
    },
  },
};

function CardSection() {
  return (
    <FormGroup>
      <FormLabel>Card details</FormLabel>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </FormGroup>
    // <label>
    //   Card details

    // </label>
  );
}

export default CardSection;
