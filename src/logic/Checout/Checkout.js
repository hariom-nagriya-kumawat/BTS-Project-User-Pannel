import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Error";
import {
  showLoader,
  hideLoader,
  CheckoutServiceAction,
  getCheckoutServiceSuccess,
} from "../../actions";
let toastId = null;



const getCheckoutServiceLogic = createLogic({
  type: CheckoutServiceAction.GET_CHECKOUTSERVICE_REQUEST,
  cancelType: CheckoutServiceAction.GET_CHECKOUTSERVICE_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getCheckoutServiceSuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/checkout-service",
      "GET",
      true,
      action.payload,
      undefined
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      if (action.payload.type === "BAG") {
        dispatch(
          getCheckoutServiceSuccess({
            BegData: [],
            isLoading: false,
            updateReq: "End",
          })
        )
      } else {
        dispatch(
          getCheckoutServiceSuccess({
            TipData: [],
            isLoading: false,
            updateReq: "End",
          })
        )
      }
      done();
      return;
    } else {
      logger(result);

      if (action.payload.type === "BAG") {
        dispatch(
          getCheckoutServiceSuccess({
            BegData: result.data,
            isLoading: false,
            updateReq: "End",
          })
        )
      } else {
        dispatch(
          getCheckoutServiceSuccess({
            TipData: result.data,
            isLoading: false,
            updateReq: "End",
          })
        )
      }
      done();
      return;
    }
  },
});



export const CheckoutServiceLogic = [
  getCheckoutServiceLogic,
];
