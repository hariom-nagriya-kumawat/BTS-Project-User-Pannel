import React, { Component } from "react";
import Login from "./checkoutauth/Login";
import SignUp from "./checkoutauth/SignUp";
import PaymentCard from "./checkoutauth/PaymentCard";
import { Collapse, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import Validator from "js-object-validation";
class CheckoutComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order_type: "",
      time: "",
      service_charge: 0,
      delivery_charge: 0,
      sub_total: 0,
      grand_total: 0,
      address: "",
      city: "",
      postCode: "",
      items: [],
      mobile: "",
      post_code: 0,
      discount: 0,
      showAddress: false,
      card_type: "",
      card_code: "",
      tipPercent: 0,
      tips: 0,
      bagqty: 0,
      bagPrice: 0,
    };
  }
  componentDidMount() {
    let checkoutItems = localStorage.getItem("viewCheckoutData");
    let checkoutData = checkoutItems ? JSON.parse(checkoutItems) : [];
    if (!checkoutData || !checkoutData.length) {
      return this.props.history.push("/order");
    }
    const { AuthReducer } = this.props;
    const { data } = AuthReducer;
    const { contact_number, address_details } = data;
    let total = 0;
    let items = [];
    if (localStorage.getItem("token") && data) {
      this.setState({
        mobile: contact_number ? contact_number : "",
        city:
          address_details && address_details.city ? address_details.city : "",
        address:
          address_details && address_details.address
            ? address_details.address
            : "",
        postCode:
          address_details && address_details.zipcode
            ? address_details.zipcode
            : "",
      });
    }
    if (checkoutData && checkoutData.length) {
      checkoutData.map((item) => {
        total =
          total +
          (item.item && item.item.online_price ? item.item.online_price : 0);
        items.push({
          id: item.item_id ? item.item_id : "",
          quantity: item.quantity ? item.quantity : 0,
          price:
            item.item && item.item.online_price ? item.item.online_price : 0,
          name: item.item && item.item.name ? item.item.name : 0,
        });
        return true;
      });
    }
    total = parseFloat(total).toFixed(2);
    this.setState({
      items: items && items.length ? items : [],
      sub_total: parseFloat(total).toFixed(2),
      grand_total: parseFloat(total).toFixed(2),
    });
  }
  componentDidUpdate = ({ AuthReducer, ChargesData }) => {
    if (
      AuthReducer &&
      AuthReducer.data &&
      AuthReducer.data !== this.props.AuthReducer.data
    ) {
      const { AuthReducer } = this.props;
      const { data } = AuthReducer;
      const { contact_number, address_details } = data;
      if (localStorage.getItem("token") && data) {
        this.setState({
          mobile: contact_number ? contact_number : "",
          city:
            address_details && address_details.city ? address_details.city : "",
          address:
            address_details && address_details.address
              ? address_details.address
              : "",
          postCode:
            address_details && address_details.zipcode
              ? address_details.zipcode
              : "",
        });
      }
    }
    if (
      ChargesData &&
      ChargesData.deliveryData &&
      ChargesData.deliveryData !== this.props.ChargesData.deliveryData
    ) {
      const { sub_total, order_type, service_charge } = this.state;
      const { ChargesData } = this.props;
      const { deliveryData } = ChargesData;
      let delivery_charge = 0;
      let grand_total = parseFloat(sub_total).toFixed(0);
      if (deliveryData && deliveryData.length && sub_total) {
        let dCharge = deliveryData.filter(
          (item) =>
            item.min_order_value <= sub_total &&
            item.max_order_value >= sub_total
        )[0];
        delivery_charge = parseFloat(
          dCharge && dCharge.tax ? dCharge.tax : 0
        ).toFixed(2);
        grand_total =
          Math.round(
            (parseFloat(sub_total) +
              parseFloat(order_type === "DELIVERY" ? delivery_charge : 0) +
              parseFloat(service_charge)) *
              100
          ) / 100;
      } else {
        delivery_charge = 0;
        grand_total =
          Math.round(
            (parseFloat(sub_total) +
              parseFloat(order_type === "DELIVERY" ? delivery_charge : 0) +
              parseFloat(service_charge)) *
              100
          ) / 100;
      }
      this.setState({
        delivery_charge: parseFloat(delivery_charge).toFixed(2),
        grand_total: parseFloat(grand_total).toFixed(2),
      });
    }
    if (
      ChargesData &&
      ChargesData.servicedata &&
      ChargesData.servicedata !== this.props.ChargesData.servicedata
    ) {
      const { sub_total, order_type, delivery_charge } = this.state;
      const { ChargesData } = this.props;
      const { servicedata } = ChargesData;
      let service_charge = 0;
      let grand_total = 0;
      grand_total = parseFloat(sub_total).toFixed(0);
      if (servicedata && servicedata.length && sub_total) {
        let sCharge = servicedata.filter(
          (item) => item.min_order_value <= sub_total
        );
        if (sCharge && sCharge.length) {
          service_charge = parseFloat(
            sCharge[sCharge.length - 1].tax
              ? sCharge[sCharge.length - 1].tax
              : 0
          );
          grand_total =
            Math.round(
              (parseFloat(grand_total) +
                parseFloat(service_charge) +
                parseFloat(order_type === "DELIVERY" ? delivery_charge : 0)) *
                100
            ) / 100;
        } else {
          service_charge = 0;
          grand_total =
            Math.round(
              (parseFloat(grand_total) +
                parseFloat(service_charge) +
                parseFloat(order_type === "DELIVERY" ? delivery_charge : 0)) *
                100
            ) / 100;
        }
      } else {
        service_charge = 0;
        grand_total =
          Math.round(
            (parseFloat(grand_total) +
              parseFloat(service_charge) +
              parseFloat(order_type === "DELIVERY" ? delivery_charge : 0)) *
              100
          ) / 100;
      }
      this.setState({
        delivery_charge: parseFloat(delivery_charge).toFixed(2),
        service_charge: parseFloat(service_charge).toFixed(2),
        grand_total: parseFloat(grand_total).toFixed(2),
      });
    }
  };

  handleChange = (e) => {
    const {
      sub_total,
      delivery_charge,
      discount,
      service_charge,
      order_type,
      tips,
      tipPercent,
      bagPrice,
    } = this.state;
    const { target } = e;
    const { value, name } = target;
    if (name === "tips") {
      this.setState({ tipPercent: 0 });
    }
    if ((name === "postCode" || name === "tips") && isNaN(value)) return true;
    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: false,
      },
    });
    if (name === "tips") {
      this.setState({
        grand_total:
          Math.round(
            (parseFloat(sub_total) +
              parseFloat(order_type === "DELIVERY" ? delivery_charge : 0) +
              parseFloat(service_charge) +
              parseFloat(bagPrice) +
              parseFloat(value ? value : 0) -
              parseFloat(discount)) *
              100
          ) / 100,
      });
    }
    if (name === "order_type") {
      this.setState({
        grand_total:
          Math.round(
            (parseFloat(sub_total) +
              parseFloat(value === "DELIVERY" ? delivery_charge : 0) +
              parseFloat(service_charge) +
              parseFloat(bagPrice) +
              parseFloat(tips && tips > 0 ? tips : tipPercent) -
              parseFloat(discount)) *
              100
          ) / 100,
      });
    }
  };
  onPlaceOrder = (data, status) => {
    const {
      items,
      order_type,
      time,
      postCode,
      address,
      city,
      delivery_charge,
      service_charge,
      card_type,
      mobile,
      card_code,
      tips,
      discount,
      tipPercent,
      sub_total,
    } = this.state;
    const data1 = {
      order_type,
      time,
      postCode: order_type === "DELIVERY" ? postCode : "test",
      address: order_type === "DELIVERY" ? address : "test",
      city: order_type === "DELIVERY" ? city : "test",
      delivery_charge,
      service_charge,
      card_type,
      mobile: order_type === "DELIVERY" ? mobile : "test",
      card_code,
      tips,
      discount,
      tipPercent,
    };
    let json = {
      item_details: items && items.length ? items : [],
      order_type: order_type,
      time: time,
      address: {
        mobile: mobile,
        post_code: postCode,
        address: [address, " , ", city].join(""),
      },
      discount: {
        type: card_type,
        code: card_code,
        amount: discount,
      },
      tips: tips && tips > 0 ? tips : tipPercent,
      bags: 25,
      service_charge: service_charge,
      delivery_charge: delivery_charge,
      ...data,
    };
    const validations = {
      order_type: {
        required: true,
      },
      time: {
        required: true,
      },
      mobile: {
        required: true,
      },
      post_code: {
        required: true,
      },
      address: {
        required: true,
      },
      city: {
        required: true,
      },
      sub_total: {
        required: true,
      },
      items: {
        required: true,
      },
    };
    const messages = {
      order_type: {
        required: "Please select order type.",
      },
      time: {
        required: "Please select time",
      },
      mobile: {
        required: "Please enter contact number",
      },
      post_code: {
        required: "Please enter post code",
      },
      address: {
        required: "Please enter address",
      },
      city: {
        required: "Please enter city",
      },
      items: {
        required: "Please select item",
      },
    };
    const { isValid, errors } = Validator(data1, validations, messages);
    if (!isValid || !status) {
      this.setState({ errors: errors ? errors : {} });
    } else {
      this.props.onPlaceOrder(json);
    }
  };
  handleChangeCardType = (e) => {
    const { target } = e;
    const { name, value } = target;
    this.setState({ [name]: value });
    this.props.onGetDiscountCardData({ card_type: value });
  };
  onQuantityBags = (e) => {
    const { CheckoutServiceReducerData } = this.props;
    const { BegData } = CheckoutServiceReducerData;
    const {
      order_type,
      discount,
      sub_total,
      delivery_charge,
      service_charge,
      tips,
      tipPercent,
    } = this.state;
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value,
      grand_total:
        Math.round(
          (parseFloat(sub_total) +
            parseFloat(order_type === "DELIVERY" ? delivery_charge : 0) +
            parseFloat(service_charge) +
            parseFloat(
              value * (BegData && BegData.length ? BegData[0].value : 0)
            ) +
            parseFloat(tips && tips > 0 ? tips : tipPercent) -
            parseFloat(discount)) *
            100
        ) / 100,
      bagPrice: parseFloat(
        value * (BegData && BegData.length ? BegData[0].value : 0)
      ).toFixed(2),
    });
  };
  onApplyCode = () => {
    const {
      card_code,
      sub_total,
      delivery_charge,
      tips,
      tipPercent,
      order_type,
      service_charge,
      bagPrice,
    } = this.state;
    const { DiscountData } = this.props;
    const { data } = DiscountData;
    let grand_total = parseFloat(sub_total).toFixed(2);
    if (data.length) {
      let result = data.filter(
        (item) => item.code === card_code && item.min_order_value <= sub_total
      );
      if (!result.length) {
        toast.error("Please enter valid code");
        grand_total =
          Math.round(
            (parseFloat(grand_total) +
              parseFloat(tips && tips > 0 ? tips : tipPercent) +
              parseFloat(service_charge) +
              parseFloat(bagPrice) +
              parseFloat(order_type === "DELIVERY" ? delivery_charge : 0) -
              parseFloat(0)) *
              100
          ) / 100;
        this.setState({ discount: 0, grand_total: grand_total });
      } else {
        toast.success("Code appliyed successfully.");
        grand_total =
          Math.round(
            (parseFloat(grand_total) +
              parseFloat(tips && tips > 0 ? tips : tipPercent) +
              parseFloat(service_charge) +
              parseFloat(bagPrice) +
              parseFloat(order_type === "DELIVERY" ? delivery_charge : 0) -
              parseFloat(result[0].discount)) *
              100
          ) / 100;
        this.setState({
          discount: parseFloat(result[0].discount).toFixed(2),
          grand_total: grand_total,
        });
      }
    }
  };
  render() {
    let token = localStorage.getItem("token");
    const {
      order_type,
      time,
      postCode,
      address,
      city,
      sub_total,
      delivery_charge,
      service_charge,
      items,
      showAddress,
      card_type,
      mobile,
      card_code,
      tips,
      bagqty,
      bagPrice,
      discount,
      grand_total,
    } = this.state;
    const { CheckoutServiceReducerData } = this.props;
    let showTip =
      CheckoutServiceReducerData &&
      CheckoutServiceReducerData.TipData[0] &&
      CheckoutServiceReducerData.TipData[0].is_deleted &&
      CheckoutServiceReducerData.TipData[0].is_deleted;
    let showBag =
      CheckoutServiceReducerData &&
      CheckoutServiceReducerData.BegData[0] &&
      CheckoutServiceReducerData.BegData[0].is_deleted &&
      CheckoutServiceReducerData.BegData[0].is_deleted;
    return (
      <>
        <div className="single-banner">
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li className="ative">Checkout</li>
          </ul>
        </div>

        <div className="checkout-outer">
          <div className="container">
            <div className="checkout-inner">
              {!token ? (
                <div className="checkout-col">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#home"
                      >
                        Login
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#menu1">
                        Sign Up
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#menu2">
                        Guest Login
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div className="tab-pane container active" id="home">
                      <Login />
                    </div>
                    <div className="tab-pane container fade" id="menu1">
                      <SignUp />
                    </div>
                    <div className="tab-pane container fade" id="menu2">
                      ...
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="checkout-col checkout-col-sec ">
                <div className="checkout-heading">
                  <h3>2. Order Details</h3>
                </div>
                <div className="checkout-content">
                  <div className="checkout-content-col">
                    <div className="checkout-option">
                      <div className="card">
                        <div className="card-header">
                          <a
                            className="card-link"
                            data-toggle="collapse"
                            href="#tableCollaps"
                          >
                            Order Type <i className="fas fas fa-angle-down"></i>
                          </a>
                        </div>
                        <div
                          id="tableCollaps"
                          className="collapse show"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            <select
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                              value={order_type}
                              name="order_type"
                            >
                              <option value={null}>Select</option>
                              <option value="DELIVERY">Delivery</option>
                              <option value="COLLECTION">Collection</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="checkout-option">
                      <div className="card">
                        <div className="card-header">
                          <a
                            className="card-link"
                            data-toggle="collapse"
                            href="#tableCollaps"
                          >
                            Collection Time{" "}
                            <i className="fas fas fa-angle-down"></i>
                          </a>
                        </div>
                        <div
                          id="tableCollaps"
                          className="collapse show"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            <select
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                              value={time}
                              name="time"
                            >
                              <option value={null}>Select</option>
                              <option value="4:30pm">4:30</option>
                              <option value="4:45pm">4:45</option>
                              <option value="5:00pm">5:00</option>
                              <option value="5:30pm">5:30</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mb-0">
                      <div className="card-header">
                        <a
                          className="card-link"
                          data-toggle="collapse"
                          href="#tableCollaps"
                        >
                          Have a coupon or Vouchar or Gift card ? Coupon Code{" "}
                        </a>
                      </div>
                      <div
                        id="tableCollaps"
                        className="collapse show"
                        data-parent="#accordion"
                      >
                        <div className="card-body">
                          <select
                            onChange={(e) => {
                              this.handleChangeCardType(e);
                            }}
                            value={card_type}
                            name="card_type"
                          >
                            <option value={null}>Select</option>
                            <option value="COUPON">Coupon</option>
                            <option value="VOUCHER">Vouchar</option>
                            <option value="GIFT_CARD">Gift Card</option>
                          </select>
                          <br />

                          {card_type !== "" ? (
                            <div className="form-col form-col-sec mt-2">
                              <input
                                type="text"
                                name="card_code"
                                value={card_code}
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                                placeholder="Code"
                              ></input>
                              <button onClick={() => this.onApplyCode()}>
                                Apply
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    {order_type === "DELIVERY" ? (
                      <div className="checkout-option checkout-optionsec mb-0">
                        <div className="card card-sec">
                          <h4
                            className="text-center"
                            onClick={() =>
                              this.setState({ showAddress: !showAddress })
                            }
                          >
                            Would you like to change your delivery address ?
                          </h4>
                          <Collapse in={showAddress}>
                            <form>
                              <div className="form-col form-col-sec">
                                <input
                                  type="text"
                                  name="postCode"
                                  value={postCode}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  maxLength={6}
                                  placeholder="Post Code"
                                ></input>
                                {/* <button>Confim</button> */}
                              </div>

                              <div className="form-col">
                                <input
                                  type="text"
                                  name="mobile"
                                  value={mobile}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  placeholder="Contact Number"
                                ></input>
                              </div>
                              <div className="form-col">
                                <input
                                  type="text"
                                  name="city"
                                  value={city}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  placeholder="Town / City"
                                ></input>
                              </div>
                              <div className="form-col mb-0">
                                <textarea
                                  name="address"
                                  value={address}
                                  placeholder="Address"
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                ></textarea>
                              </div>
                            </form>
                          </Collapse>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="checkout-content-col checkout-price-table">
                    <h4 className="text-center">Order Summery</h4>
                    <ul>
                      <li className="priceTable-heading">
                        <span className="srial-no">S.No.</span>
                        <span className="item">Item</span>
                        <span className="qty">Qty</span>
                        <span className="price">Price</span>
                      </li>
                      {items && items.length
                        ? items.map((itm, index) => {
                            return (
                              <li className="priceTable-list">
                                <span className="srial-no">{index + 1}</span>
                                <span className="item">{itm.name}</span>
                                <span className="qty">{itm.quantity}</span>
                                <span className="price">
                                  £ {parseFloat(itm.price).toFixed(2)}
                                </span>
                              </li>
                            );
                          })
                        : null}
                      <li>
                        <Row>
                          <Col lg={6} classname="text-left">
                            {" "}
                            <span>Total Item Qty :</span>{" "}
                          </Col>
                          <Col lg={6} className="text-right">
                            {items && items.length ? items.length : 0}
                          </Col>
                          <Col lg={6} classname="text-left">
                            <span>Sub Total :</span>
                          </Col>
                          <Col lg={6} classname="text-right">
                            <span>£ {sub_total}</span>
                          </Col>
                        </Row>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="checkout-col">
                <div className="checkout-heading">
                  <h3>3. Payment & Place Order</h3>
                  {card_type && card_code && discount ? (
                    <Row className="mt-2">
                      <Col>
                        <Card className="text-left text1 w-100 px-1 text1">
                          <span>Discount</span>
                        </Card>
                      </Col>

                      <Col>
                        <Card className="text-left text1 text1 w-100 px-1">
                          <span>£ {discount}</span>
                        </Card>
                      </Col>
                    </Row>
                  ) : null}
                  {order_type === "DELIVERY" ? (
                    <Row className="mt-2">
                      <Col>
                        <Card className="text-left text1 text1 w-100 px-1">
                          <span>Delivery Fee</span>
                        </Card>
                      </Col>

                      <Col>
                        <Card className="text-left text1 text1 w-100 px-1">
                          <span>£ {delivery_charge}</span>
                        </Card>
                      </Col>
                    </Row>
                  ) : null}
                  <Row className="mt-2">
                    <Col>
                      <Card className="text-left text1 text1 w-100 px-1">
                        <span>Service Fee</span>
                      </Card>
                    </Col>

                    <Col>
                      <Card className="text-left text1 text1 w-100 px-1">
                        <span>£ {service_charge}</span>
                      </Card>
                    </Col>
                  </Row>

                  {!showTip ? (
                    <>
                      <Row className="mt-3">
                        <Col>
                          <Card className="text-center text1">
                            <span>Tips</span>
                          </Card>
                        </Col>
                        <Col>
                          <div>
                            <input
                              type="text"
                              name="tips"
                              value={tips}
                              maxLength={4}
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                              placeholder="Custome"
                              className="input1"
                            ></input>
                          </div>
                        </Col>
                        <Col>
                          <Card
                            lg={3}
                            onClick={() =>
                              this.setState({
                                tipPercent: parseFloat(
                                  (sub_total * 5) / 100
                                ).toFixed(0),
                                tips: 0,
                                grand_total:
                                  Math.round(
                                    (parseFloat(sub_total) +
                                      parseFloat(service_charge) +
                                      parseFloat(bagPrice) +
                                      parseFloat(
                                        order_type === "DELIVERY"
                                          ? delivery_charge
                                          : 0
                                      ) +
                                      parseFloat((sub_total * 5) / 100) -
                                      parseFloat(discount)) *
                                      100
                                  ) / 100,
                              })
                            }
                            className={
                              this.state.tipPercent === 5
                                ? "selectCard text-center pt-1 text1"
                                : "text-center pt-1 text1"
                            }
                          >
                            5%=£ {parseFloat((sub_total * 5) / 100).toFixed(0)}
                          </Card>
                        </Col>
                      </Row>
                      <Row className="mt-1">
                        <Col>
                          <Card
                            lg={3}
                            onClick={() =>
                              this.setState({
                                tipPercent: parseFloat(
                                  (sub_total * 10) / 100
                                ).toFixed(0),
                                tips: 0,
                                grand_total:
                                  Math.round(
                                    (parseFloat(sub_total) +
                                      parseFloat(service_charge) +
                                      parseFloat(bagPrice) +
                                      parseFloat(
                                        order_type === "DELIVERY"
                                          ? delivery_charge
                                          : 0
                                      ) +
                                      parseFloat((sub_total * 10) / 100) -
                                      parseFloat(discount)) *
                                      100
                                  ) / 100,
                              })
                            }
                            className={
                              this.state.tipPercent === 10
                                ? "selectCard text-center pt-1 text1"
                                : "text-center pt-1 text1"
                            }
                          >
                            10%=£{" "}
                            {parseFloat((sub_total * 10) / 100).toFixed(0)}
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            lg={3}
                            onClick={() =>
                              this.setState({
                                tipPercent: parseFloat(
                                  (sub_total * 15) / 100
                                ).toFixed(0),
                                tips: 0,
                                grand_total:
                                  Math.round(
                                    (parseFloat(sub_total) +
                                      parseFloat(service_charge) +
                                      parseFloat(bagPrice) +
                                      parseFloat(
                                        order_type === "DELIVERY"
                                          ? delivery_charge
                                          : 0
                                      ) +
                                      parseFloat((sub_total * 15) / 100) -
                                      parseFloat(discount)) *
                                      100
                                  ) / 100,
                              })
                            }
                            className={
                              this.state.tipPercent === 15
                                ? "selectCard text-center pt-1 text1"
                                : "text-center pt-1 text1"
                            }
                          >
                            {" "}
                            15%=£{" "}
                            {parseFloat((sub_total * 15) / 100).toFixed(0)}
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            lg={3}
                            onClick={() =>
                              this.setState({
                                tipPercent: parseFloat(
                                  (sub_total * 20) / 100
                                ).toFixed(0),
                                tips: 0,
                                grand_total:
                                  Math.round(
                                    (parseFloat(sub_total) +
                                      parseFloat(service_charge) +
                                      parseFloat(bagPrice) +
                                      parseFloat(
                                        order_type === "DELIVERY"
                                          ? delivery_charge
                                          : 0
                                      ) +
                                      parseFloat((sub_total * 20) / 100) -
                                      parseFloat(discount)) *
                                      100
                                  ) / 100,
                              })
                            }
                            className={
                              this.state.tipPercent === 20
                                ? "selectCard text-center pt-1 text1"
                                : "text-center pt-1 text1"
                            }
                          >
                            20%=£{" "}
                            {parseFloat((sub_total * 20) / 100).toFixed(0)}
                          </Card>
                        </Col>
                      </Row>{" "}
                    </>
                  ) : null}
                  {!showBag ? (
                    <>
                      <Row className="mt-2">
                        <Col lg={4}>
                          <Card className="text-center w-100 text1">Bag</Card>
                        </Col>

                        <Col lg={4}>
                          <div>
                            <input
                              type="number"
                              className="input1"
                              name="bagqty"
                              value={bagqty}
                              onChange={(e) => this.onQuantityBags(e)}
                            />
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div>
                            <input
                              type="number"
                              className="input1"
                              name="bagPrice"
                              value={bagPrice}
                              readOnly
                            />
                          </div>
                        </Col>
                      </Row>
                    </>
                  ) : null}

                  <Row className="mt-2">
                    <Col>
                      <Card className="text-left text1 w-100 px-1">
                        <span>Total</span>
                      </Card>
                    </Col>

                    <Col>
                      <Card className="text-left text1 w-100 px-1">
                        <span>£ {parseFloat(grand_total).toFixed(2)}</span>
                      </Card>
                    </Col>
                  </Row>

                  <PaymentCard
                    {...this.props}
                    onPlaceOrder={this.onPlaceOrder}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CheckoutComponent;
