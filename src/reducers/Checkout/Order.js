import { handleActions } from "redux-actions";
import { checkoutAction } from "../../actions";

const initialState = {
  data: [],
  isLoading: false,
};

export const CheckOutReducer = handleActions(
  {
    [checkoutAction.GET_CHECKOUT_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
