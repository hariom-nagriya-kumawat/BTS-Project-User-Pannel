import React, { Component } from "react";
import CheckoutComponent from "../components/checkout";
import { connect } from "react-redux";
import {
  addCheckOutRequest,
  getServiceDiscountRequest,
  getDeliveryChargesRequest,
  getDayScheduleRequest,
  getDiscountCardRequest, getCheckoutServiceRequest,
} from "../actions";

class Checkout extends Component {
  componentDidMount() {
    this.props.getServiceCharge({ is_deleted: false });
    this.props.getDeliveryCharge({ is_deleted: false });
    this.props.getDayScheduleData({ is_deleted: false });
    this.props.getDiscountCard({ is_deleted: false });
    this.props.getCardData({ type: "BAG" });
    this.props.getCardData({ type: "TIP" });
  }
  render() {
    const { AuthReducer, ChargesData, DayScheduleData, DiscountData, CheckoutServiceReducerData } =
      this.props;
    return (
      <>
        <CheckoutComponent
          {...this.props}
          AuthReducer={AuthReducer}
          onPlaceOrder={this.props.onPlaceOrder}
          ChargesData={ChargesData}
          DayScheduleData={DayScheduleData}
          DiscountData={DiscountData}
          onGetDiscountCardData={this.props.getDiscountCard}
          CheckoutServiceReducerData={this.props.CheckoutServiceReducerData}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  AuthReducer: state.AuthReducer,
  ChargesData: state.ChargesReducer,
  DayScheduleData: state.ScheduleReducer,
  DiscountData: state.DiscountCardReducer,
  CheckoutServiceReducerData: state.CheckoutServiceReducer,
});
const mapDispatchToProps = (dispatch) => {
  return {
    onPlaceOrder: (data) => {
      dispatch(addCheckOutRequest(data));
    },
    getServiceCharge: (data) => {
      dispatch(getServiceDiscountRequest(data));
    },
    getDeliveryCharge: (data) => {
      dispatch(getDeliveryChargesRequest(data));
    },
    getDayScheduleData: (data) => {
      dispatch(getDayScheduleRequest(data));
    },
    getDiscountCard: (data) => {
      dispatch(getDiscountCardRequest(data));
    },
    getCardData: (data) => {
      dispatch(getCheckoutServiceRequest(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
