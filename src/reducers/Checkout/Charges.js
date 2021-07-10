import { handleActions } from "redux-actions";
import { ChargesAction } from "../../actions";

const initialState = {
  servicedata: [],
  deliveryData: [],
  isLoading: false,
  updateReq: "End",
};

export const ChargesReducer = handleActions(
  {
    [ChargesAction.GET_DELIVERYCHARGES_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    [ChargesAction.GET_SERVICEDISCOUNT_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
