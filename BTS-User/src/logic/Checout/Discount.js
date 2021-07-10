import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Error";
import {
  showLoader,
  hideLoader,
  DiscountCardActions,
  getDiscountCardSuccess,
  getDiscountCardRequest,
} from "../../actions";
let toastId = null;

// getList
const getDiscountCardLogic = createLogic({
  type: DiscountCardActions.GET_DISCOUNTCARD_REQUEST,
  cancelType: DiscountCardActions.GET_DISCOUNTCARD_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getDiscountCardSuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/discount-card",
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
        getDiscountCardSuccess({
          data: [],
          isLoading: false,
          updateReq: "End",
        })
      );
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getDiscountCardSuccess({
          data: result.data,
          isLoading: false,
          updateReq: "End",
        })
      );
      done();
      return;
    }
  },
});

export const DiscountCardLogic = [getDiscountCardLogic];
