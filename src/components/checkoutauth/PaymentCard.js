import React, { Component } from "react";
import Validator from "js-object-validation";
import FullPageLoader from "../../containers/Loader/FullPageLoader";
import {
  FormGroup,
  FormControl,
  FormLabel,
  Form,
  Row,
  Col,
  Card,
} from "react-bootstrap";
var stripe = require("stripe-client")(
  "pk_test_51J83FOSHqNstW8SUpv66ptlTLuhI2jjsrv8UVu7jK2hwUFTv0UPhKYJnalCsLB0Yez0d2eaCa1AMYxXlu3WMmRKE00PtG9G1E0"
);
// const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

class PaymentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: "",
      exp_month: "",
      exp_year: "",
      cvc: "",
      name: "",
      errors: {},
      paymentType: "Card",
    };
  }

  handleChange = (e) => {
    const { target } = e;
    const { value, name } = target;
    if (
      (name === "cardNumber" ||
        name === "exp_month" ||
        name === "exp_year" ||
        name === "cvc") &&
      isNaN(value)
    )
      return true;
    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: false,
      },
    });
  };

  onPlaceOrder = async () => {
    const { cardNumber, name, exp_month, exp_year, cvc, paymentType } =
      this.state;
    console.log("Hello", paymentType);
    this.setState({ isLoading: true });
    try {
      if (paymentType === "Cash") {
        if (!localStorage.getItem("token")) {
          return alert("Please login");
        }
        let json = {
          notes: "test notes",
          status: "InProgress",
          payment_status: "InProgress",
          payment_type: "Cash",
          token_id: "",
        };
        this.props.onPlaceOrder(json, true);
      } else {
        const json = {
          number: cardNumber,
          exp_month: exp_month,
          exp_year: exp_year,
          cvc: cvc,
          name: name,
        };

        var information = {
          card: {
            number: "4242424242424242",
            exp_month: 7,
            exp_year: 2022,
            cvc: "314",
          },
        };
        const validations = {
          cardNumber: {
            required: true,
          },
          name: {
            required: true,
          },
          exp_month: {
            require: true,
          },
          cvc: {
            require: true,
          },
          exp_year: {
            require: true,
          },
        };
        const messages = {
          cardNumber: {
            required: "Please enter card number.",
          },
          name: {
            required: "Please enter holder name.",
          },
          exp_month: {
            required: "Please enter exp month.",
          },
          cvc: {
            required: "Please enter cvc.",
          },
          exp_year: {
            required: "Please enter exp year.",
          },
        };

        const { isValid, errors } = Validator(json, validations, messages);
        if (!isValid) {
          this.setState({ isLoading: false });
          this.setState({ errors });
        } else {
          let card = await stripe.createToken(information);
          let token = card.id;
          console.log("!!!!");
          // let token = await stripe.createToken({
          //   card: {
          //     number: "4242424242424242",
          //     exp_month: 7,
          //     exp_year: 2022,
          //     cvc: "314",
          //   },
          // });
          console.log("token", card, token);
        }
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { cardNumber, name, errors, exp_month, exp_year, cvc, paymentType } =
      this.state;
    console.log("errors", errors);
    return (
      <>
      <Row className = "mt-4">
          <Col>
            <FormGroup>
              <span className="d-flex flex-row">

              <Card className = "text-center d-flex flex-row pt-2 px-2">
                <input
                  type="radio"
                  name="paymentType"
                  value="Cash"
                  checked={paymentType === "Cash" ? true : false}
                  onChange={(e) => this.handleChange(e)}
                  className = "mt-1"
                />
                <label className="ml-2 mb-1">Cash</label></Card>
                <Card className = "ml-3 text-center d-flex flex-row pt-2 px-2">
                <input
                  type="radio"
                  value="Card"
                  name="paymentType"
                  checked={paymentType === "Card" ? true : false}
                  onChange={(e) => this.handleChange(e)}
                  className = "mt-1"
                />
                <label className="ml-2 mb-1">Card</label></Card>
                
              <Card className = "text-center d-flex flex-row pt-2 px-2 ml-2">
                <input
                  type="radio"
                  name="paymentType"
                  value="Cash"
                  checked={paymentType === "Cash" ? true : false}
                  onChange={(e) => this.handleChange(e)}
                  className = "mt-1"
                />
                <label className="ml-2 mb-1">Wallet</label></Card>
              </span>
            </FormGroup>
          </Col>
        </Row>
        {paymentType === "Card" ? (
          <>
            <Row className="mt-2">
              <Col>
                <FormGroup className="form-col">
                  <FormControl
                    type="text"
                    name="cardNumber"
                    value={cardNumber}
                    maxLength={16}
                    placeholder="card number"
                    onChange={(e) => this.handleChange(e)}
                    isInvalid={errors.cardNumber}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.cardNumber ? errors.cardNumber : null}
                  </Form.Control.Feedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup className="form-col">
                  <FormControl
                    type="text"
                    name="name"
                    value={name}
                    maxLength={60}
                    placeholder="card holder name"
                    onChange={(e) => this.handleChange(e)}
                    isInvalid={errors.name}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.name ? errors.name : null}
                  </Form.Control.Feedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup className="form-col">
                  <FormControl
                    value={exp_month}
                    name="exp_month"
                    onChange={(e) => this.handleChange(e)}
                    type="text"
                    maxLength={2}
                    isInvalid={errors.exp_month}
                    placeholder="MM"
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.exp_month ? errors.exp_month : null}
                  </Form.Control.Feedback>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="form-col">
                  <FormControl
                    value={exp_year}
                    name="exp_year"
                    onChange={(e) => this.handleChange(e)}
                    type="text"
                    maxLength={2}
                    isInvalid={errors.exp_year}
                    placeholder="YY"
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.exp_year ? errors.exp_year : null}
                  </Form.Control.Feedback>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="form-col">
                  <FormControl
                    value={cvc}
                    name="cvc"
                    onChange={(e) => this.handleChange(e)}
                    type="text"
                    maxLength={3}
                    isInvalid={errors.cvc}
                    placeholder="ex. 311"
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.cvc ? errors.cvc : null}
                  </Form.Control.Feedback>
                </FormGroup>
              </Col>
            </Row>
          </>
        ) : null}
        <div className="form-col text-right mt-3 px-5">
          {paymentType === "Card" ? (
            
            <button type="button" class="btn btn-secondary btn-sm mb-3 w-100" onClick={() => this.onPlaceOrder()}>Please Pay Now</button>
          ) : (
            <button type="button" class="btn btn-secondary btn-sm mb-3 w-100" onClick={(e) => this.onPlaceOrder()}>Place My Order</button>

          )}
        </div>
      </>
    );
  }
}

export default PaymentCard;
