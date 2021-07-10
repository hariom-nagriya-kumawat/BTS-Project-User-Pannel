import { createAction } from "redux-actions";

export const DiscountCardActions = {

  GET_DISCOUNTCARD_REQUEST: "GET DISCOUNTCARDS REQUESTED!",
  GET_DISCOUNTCARD_SUCCESS: "GET DISCOUNTCARD SUCCESS!",
  GET_DISCOUNTCARD_FAILED: "GET DISCOUNTCARD FAILED!",

};


export const getDiscountCardRequest = createAction(
  DiscountCardActions.GET_DISCOUNTCARD_REQUEST
);

export const getDiscountCardSuccess = createAction(
  DiscountCardActions.GET_DISCOUNTCARD_SUCCESS
);
export const getDiscountCardFailed = createAction(
  DiscountCardActions.GET_DISCOUNTCARD_FAILED
);
