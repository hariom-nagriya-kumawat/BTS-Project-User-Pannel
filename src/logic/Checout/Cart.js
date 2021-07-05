import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Error";
import {
  hideLoader,
  cartAction,
  getCartSuccess
} from "../../actions";
let toastId = null;



const addCartLogic = createLogic({
  type: cartAction.ADD_CART_REQUEST,
  cancelType: cartAction.ADD_CART_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getCartSuccess({ updateReq: "Start" }));
    let data =
      getState().CartReducer && getState().CartReducer.data
        ? getState().CartReducer.data
        : [];
    // dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/cart",
      "POST",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      // dispatch(hideLoader());
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getCartSuccess({
          data: [result.data, ...data],
          isLoading: false,
          updateReq: "End",
        })
      );
      dispatch(hideLoader());
      done();
    }
  },
});


const addCartWithOutLoginLogic = createLogic({
  type: cartAction.ADD_CART_WITHOUT_LOGIN_REQUEST,
  async process({ action, getState }, dispatch, done) {
    dispatch(getCartSuccess({ updateReq: "Start" }));
    let data =
      getState().CartReducer && getState().CartReducer.data
        ? getState().CartReducer.data
        : [];
    data.push(action.payload);
    let dataCart = [];
    let viewCartData = localStorage.getItem("viewCartData");
    if (viewCartData) {
      dataCart = JSON.parse(viewCartData);
      dataCart.push(action.payload);
      localStorage.setItem("viewCartData", JSON.stringify(dataCart));
    }
    else {
      dataCart.push(action.payload);
      localStorage.setItem("viewCartData", JSON.stringify(dataCart));

    }
    dispatch(
      getCartSuccess({
        data: data,
        isLoading: false,
        updateReq: "End",
      })
    );
    done();

  },
});

// getList
const getCartLogic = createLogic({
  type: cartAction.GET_CART_REQUEST,
  cancelType: cartAction.GET_CART_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getCartSuccess({ isLoading: true, updateReq: "Start" }));
    let token = localStorage.getItem("token");
    if (token) {
      let api = new ApiHelper();
      let result = await api.FetchFromServer(
        "",
        "/cart",
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
          getCartSuccess({ isLoading: false, data: [], updateReq: "End" })
        );
        done();
        return;
      } else {
        logger(result);

        let viewCartData = localStorage.getItem("viewCartData");
        let result1 = JSON.parse(viewCartData);
        dispatch(
          getCartSuccess({
            data: [...result.data, result1],
            isLoading: false,
            updateReq: "End",
          })
        );
        done();
        return;
      }
    }
    else {
      let viewCartData = localStorage.getItem("viewCartData");
      let result = JSON.parse(viewCartData);
      dispatch(
        getCartSuccess({
          data: result,
          isLoading: false,
          updateReq: "End",
        })
      );
      done();
    }

  },
});

// get Data by Id

// const getCartByIdLogic = createLogic({
//   type: cartAction.GET_CART_REQUEST_BY_ID,
//   cancelType: cartAction.GET_CART_FAILED_BY_ID,
//   async process({ action }, dispatch, done) {
//     dispatch(showLoader());
//     let api = new ApiHelper();
//     let result = await api.FetchFromServer(
//       "",
//       ["/cart/" + action.payload.cart_id],
//       "GET",
//       true,
//       undefined,
//       undefined
//     );
//     if (result.isError) {
//       if (!toast.isActive(toastId)) {
//         toastId = toast.error(result.messages[0] || DefaultErrorMessage);
//       }
//       dispatch(hideLoader());
//       done();
//       return;
//     } else {
//       logger(result);
//       dispatch(getCartSuccessById({ dataById: result.data }));
//       dispatch(hideLoader());
//       done();
//       return;
//     }
//   },
// });

// update

const updateCartLogic = createLogic({
  type: cartAction.UPDATE_CART_REQUEST,
  cancelType: cartAction.UPDATE_CART_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getCartSuccess({ updateReq: "Start" }));
    let data =
      getState().CartReducer && getState().CartReducer.data
        ? getState().CartReducer.data
        : [];
    if (localStorage.getItem("token") && action.payload.cart_id) {
      let api = new ApiHelper();
      let result = await api.FetchFromServer(
        "",
        ["/cart/" + action.payload.cart_id],
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

        if (result.data && result.data.is_removed) {
          let index = data.findIndex((item) => item._id === action.payload.cart_id);
          data.splice(index, 1)
        } else {
          let index = data.findIndex((item) => item._id === action.payload.cart_id);
          data[index] = result.data;
        }
        dispatch(
          getCartSuccess({ data: data, isLoading: false, updateReq: "End" })
        );
        done();
        return;
      }
    } else {
      let viewCartData = localStorage.getItem("viewCartData");
      let result = JSON.parse(viewCartData);
      let index = result.findIndex((item) => item.item_id === action.payload.item_id);
      let index1 = data.findIndex((item) => item.item_id === action.payload.item_id);
      result[index] = { ...result[index], quantity: action.payload.quantity, price: action.payload.price };
      data[index1] = { ...data[index1], quantity: action.payload.quantity, price: action.payload.price };
      localStorage.setItem("viewCartData", JSON.stringify(result));
      dispatch(
        getCartSuccess({ data: data, isLoading: false, updateReq: "End" })
      );
      done();
      return;
    }
  },
});

const deleteCartLogic = createLogic({
  type: cartAction.DELETE_CART_REQUEST,
  cancelType: cartAction.DELETE_CART_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getCartSuccess({ updateReq: "Start" }));
    let data =
      getState().CartReducer && getState().CartReducer.data
        ? getState().CartReducer.data
        : [];
    let token = localStorage.getItem("token");
    if (token && action.payload.cart_id) {
      let api = new ApiHelper();
      let result = await api.FetchFromServer(
        "",
        ["/cart/" + action.payload.cart_id],
        "DELETE",
        true,
        undefined,
        undefined
      );
      if (result.isError) {
        if (!toast.isActive(toastId)) {
          toastId = toast.error(result.messages[0] || DefaultErrorMessage);
        }
        done();
        return;
      } else {
        logger(result);
        let index = data.findIndex((item) => item._id === action.payload.cart_id);
        data.splice(index, 1)
        dispatch(
          getCartSuccess({ data: data, isLoading: false, updateReq: "End" })
        );
        done();
        return;
      }
    } else {
      let viewCartData = localStorage.getItem("viewCartData");
      let result = JSON.parse(viewCartData);
      let index = result.findIndex((item) => item.item_id === action.payload.item_id);
      let index1 = data.findIndex((item) => item.item_id === action.payload.item_id);
      result.splice(index, 1);
      data.splice(index1, 1);
      localStorage.setItem("viewCartData", JSON.stringify(result));
      dispatch(
        getCartSuccess({ data: data, isLoading: false, updateReq: "End" })
      );
      done();
      return;
    }
  },
});

export const CartLogic = [
  addCartLogic,
  getCartLogic,
  updateCartLogic,
  addCartWithOutLoginLogic,
  deleteCartLogic
];
