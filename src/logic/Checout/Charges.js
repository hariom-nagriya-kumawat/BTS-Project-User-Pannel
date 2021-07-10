import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Error";
import {
  getServiceDiscountSuccess,
  getDeliveryChargesSuccess,ChargesAction
} from "../../actions";
let toastId = null;



// getList
const getServiceDiscountLogic = createLogic({
  type: ChargesAction.GET_SERVICEDISCOUNT_REQUEST,
  cancelType: ChargesAction.GET_SERVICEDISCOUNT_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getServiceDiscountSuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/service-charge",
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
        getServiceDiscountSuccess({ isLoading: false, data: [], updateReq: "End" })
      );
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getServiceDiscountSuccess({
          servicedata: result.data,
          isLoading: false,
          updateReq: "End",
        })
      );
      done();
      return;
    }
  },
});
const getDeliveryChargesLogic = createLogic({
  type: ChargesAction.GET_DELIVERYCHARGES_REQUEST,
  cancelType: ChargesAction.GET_DELIVERYCHARGES_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getDeliveryChargesSuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/delivery-charge",
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
        getDeliveryChargesSuccess({ isLoading: false, data: [], updateReq: "End" })
      );
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getDeliveryChargesSuccess({
          deliveryData: result.data,
          isLoading: false,
          updateReq: "End",
        })
      );
      done();
      return;
    }
  },
});


export const ChargesLogic = [
  getServiceDiscountLogic,getDeliveryChargesLogic
];
