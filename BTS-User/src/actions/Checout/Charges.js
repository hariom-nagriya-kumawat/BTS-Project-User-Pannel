import { createAction } from "redux-actions";

export const ChargesAction = {

  GET_DELIVERYCHARGES_REQUEST: "GET DELIVERYCHARGES REQUESTED!",
  GET_DELIVERYCHARGES_SUCCESS: "GET DELIVERYCHARGES SUCCESS!",
  GET_DELIVERYCHARGES_FAILED: "GET DELIVERYCHARGES FAILED!",

  
  GET_SERVICEDISCOUNT_REQUEST: "GET SERVICEDISCOUNTS REQUESTED!",
  GET_SERVICEDISCOUNT_SUCCESS: "GET SERVICEDISCOUNT SUCCESS!",
  GET_SERVICEDISCOUNT_FAILED: "GET SERVICEDISCOUNT FAILED!",


};


// GET DeliveryChargess

export const getDeliveryChargesRequest = createAction(
 ChargesAction.GET_DELIVERYCHARGES_REQUEST
);

export const getDeliveryChargesSuccess = createAction(
 ChargesAction.GET_DELIVERYCHARGES_SUCCESS
);
export const getDeliveryChargesFailed = createAction(
 ChargesAction.GET_DELIVERYCHARGES_FAILED
);


export const getServiceDiscountRequest = createAction(
  ChargesAction.GET_SERVICEDISCOUNT_REQUEST
 );
 
 export const getServiceDiscountSuccess = createAction(
  ChargesAction.GET_SERVICEDISCOUNT_SUCCESS
 );
 export const getServiceDiscountFailed = createAction(
  ChargesAction.GET_SERVICEDISCOUNT_FAILED
 );
 
 
 
 