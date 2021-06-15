import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { AuthReducer } from "./auth";
import {FoodTypeReducer} from "./Menu/Foodtype";
import {FillterReducer} from "./Menu/Fillter";
import{CategorieReducer} from "./Menu/Category";
import {ItemsReducer} from "./Menu/Items";
import { handleActions } from "redux-actions";

export const mainReducer = handleActions(
  {
    SHOW_LOADER: (state, action) => ({
      showLoader: true,
    }),
    HIDE_LOADER: (state, action) => ({
      showLoader: false,
    }),
  },
  {
    showLoader: false,
  }
);

const AppReducer = combineReducers({
  mainReducer,
  AuthReducer,
  FoodTypeReducer,
  FillterReducer,
  CategorieReducer,
  ItemsReducer,
  routing: routerReducer,
});

export default AppReducer;
