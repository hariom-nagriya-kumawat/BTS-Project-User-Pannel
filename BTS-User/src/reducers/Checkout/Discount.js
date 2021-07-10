import { handleActions } from "redux-actions";
import { DiscountCardActions } from "../../actions";

const initialState = {
  data: [],
  updateReq: "End",
  isLoading: false,
  dataById: {},
};

export const DiscountCardReducer = handleActions(
  {
    [DiscountCardActions.GET_DISCOUNTCARD_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    [DiscountCardActions.GET_DISCOUNTCARD_SUCCESS_BY_ID]: (
      state,
      { payload }
    ) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
