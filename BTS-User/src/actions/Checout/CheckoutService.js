import { createAction } from "redux-actions";

export const CheckoutServiceAction = {

  GET_CHECKOUTSERVICE_REQUEST: "GET CHECKOUTSERVICE REQUESTED!",
  GET_CHECKOUTSERVICE_SUCCESS: "GET CHECKOUTSERVICE SUCCESS!",
  GET_CHECKOUTSERVICE_FAILED: "GET CHECKOUTSERVICE FAILED!",



};


export const getCheckoutServiceRequest = createAction(
  CheckoutServiceAction.GET_CHECKOUTSERVICE_REQUEST
);

export const getCheckoutServiceSuccess = createAction(
  CheckoutServiceAction.GET_CHECKOUTSERVICE_SUCCESS
);
export const getCheckoutServiceFailed = createAction(
  CheckoutServiceAction.GET_CHECKOUTSERVICE_FAILED
);


