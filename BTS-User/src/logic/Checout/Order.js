import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Error";
import {
  showLoader,
  hideLoader,
  checkoutAction,
  getCheckOutSuccess,
  getCheckOutRequest,
} from "../../actions";
let toastId = null;

/**
 *  CRUD CheckOut
 */

const addCheckOutLogic = createLogic({
  type: checkoutAction.ADD_CHECKOUT_REQUEST,
  cancelType: checkoutAction.ADD_CHECKOUT_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getCheckOutSuccess({ updateReq: "Start" }));
    let data =
      getState().CheckOutReducer && getState().CheckOutReducer.data
        ? getState().CheckOutReducer.data
        : [];
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/order",
      "POST",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      done();
      return;
    } else {
      logger(result);
      toastId = toast.success("Placed your order successfully");
      localStorage.removeItem("viewCartData");
      localStorage.removeItem("viewCheckoutData");
      dispatch(
        getCheckOutSuccess({
          data: [...data, result.data],
          updateReq: "End",
        })
      );
      done();
    }
  },
});

// GetList
const getCheckOutLogic = createLogic({
  type: checkoutAction.GET_CHECKOUT_REQUEST,
  cancelType: checkoutAction.GET_CHECKOUT_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getCheckOutSuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/order",
      "GET",
      true,
      action.payload,
      undefined
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      dispatch(
        getCheckOutSuccess({ isLoading: false, data: [], updateReq: "End" })
      );
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getCheckOutSuccess({
          data: result.data ? result.data : [],
          isLoading: false,
          updateReq: "End",
        })
      );
      done();
      return;
    }
  },
});

// Update

const updateCheckOutLogic = createLogic({
  type: checkoutAction.UPDATE_CHECKOUT_REQUEST,
  cancelType: checkoutAction.UPDATE_CHECKOUT_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getCheckOutSuccess({ updateReq: "Start" }));
    let data =
      getState().CheckOutReducer && getState().CheckOutReducer.data
        ? getState().CheckOutReducer.data
        : [];
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/order/" + action.payload.order_id],
      "PUT",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      done();
      return;
    } else {
      logger(result);
      let index = data.findIndex(
        (item) => item._id === action.payload.order_id
      );
      data[index] = result.data;
      dispatch(getCheckOutSuccess({ data: data, updateReq: "End" }));
      done();
      return;
    }
  },
});

export const CheckOutLogic = [
  addCheckOutLogic,
  getCheckOutLogic,
  updateCheckOutLogic,
];
