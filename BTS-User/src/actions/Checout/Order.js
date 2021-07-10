import { createAction } from "redux-actions";

export const checkoutAction = {
  ADD_CHECKOUT_REQUEST: "ADD CHECKOUT REQUESTED!",
  ADD_CHECKOUT_SUCCESS: "ADD CHECKOUT SUCCESS!",
  ADD_CHECKOUT_FAILED: "ADD CHECKOUT FAILED!",

  ADD_CHECKOUT_WITHOUT_LOGIN_REQUEST: "ADD CHECKOUT WITHOUT LOGIN REQUESTED!",

  GET_CHECKOUT_REQUEST: "GET CheckOut REQUESTED!",
  GET_CHECKOUT_SUCCESS: "GET CHECKOUT SUCCESS!",
  GET_CHECKOUT_FAILED: "GET CHECKOUT FAILED!",

  GET_CHECKOUT_REQUEST_BY_ID: "GET CHECKOUT REQUESTED BY ID!",
  GET_CHECKOUT_SUCCESS_BY_ID: "GET CHECKOUT SUCCESS BY ID!",
  GET_CHECKOUT_FAILED_BY_ID: "GET CHECKOUT FAILED BY ID!",

  UPDATE_CHECKOUT_REQUEST: "UPDATE CHECKOUT REQUESTED!",
  UPDATE_CHECKOUT_SUCCESS: "UPDATE CHECKOUT SUCCESS!",
  UPDATE_CHECKOUT_FAILED: "UPDATE CHECKOUT FAILED!",


  DELETE_CHECKOUT_REQUEST: "DELETE CHECKOUT REQUESTED!",
  DELETE_CHECKOUT_SUCCESS: "DELETE CHECKOUT SUCCESS!",
  DELETE_CHECKOUT_FAILED: "DELETE CHECKOUT FAILED!",

};

// add CheckOuts
export const addCheckOutRequest = createAction(
  checkoutAction.ADD_CHECKOUT_REQUEST
);

export const addCheckOutSuccess = createAction(
  checkoutAction.ADD_CHECKOUT_SUCCESS
);
export const addCheckOutFailed = createAction(
  checkoutAction.ADD_CHECKOUT_FAILED
);

// GET checkouts

export const addCheckOutLoginRequest = createAction(
  checkoutAction.ADD_CHECKOUT_WITHOUT_LOGIN_REQUEST
);

export const getCheckOutRequest = createAction(
  checkoutAction.GET_CHECKOUT_REQUEST
);

export const getCheckOutSuccess = createAction(
  checkoutAction.GET_CHECKOUT_SUCCESS
);
export const getCheckOutFailed = createAction(
  checkoutAction.GET_CHECKOUT_FAILED
);

// GET checkouts BY ID

export const getCheckOutRequestById = createAction(
  checkoutAction.GET_CHECKOUT_REQUEST_BY_ID
);

export const getCheckOutSuccessById = createAction(
  checkoutAction.GET_CHECKOUT_SUCCESS_BY_ID
);
export const getCheckOutFailedById = createAction(
  checkoutAction.GET_CHECKOUT_FAILED_BY_ID
);

// update checkouts

export const updateCheckOutRequest = createAction(
  checkoutAction.UPDATE_CHECKOUT_REQUEST
);

export const updateCheckOutSuccess = createAction(
  checkoutAction.UPDATE_CHECKOUT_SUCCESS
);
export const updateCheckOutFailed = createAction(
  checkoutAction.UPDATE_CHECKOUT_FAILED
);

// DELETTE checkouts

export const deleteCheckOutRequest = createAction(
  checkoutAction.DELETE_CHECKOUT_REQUEST
);

export const deleteCheckOutSuccess = createAction(
  checkoutAction.DELETE_CHECKOUT_SUCCESS
);
export const deletecheckoutFailed = createAction(
  checkoutAction.DELETE_CHECKOUT_FAILED
);

