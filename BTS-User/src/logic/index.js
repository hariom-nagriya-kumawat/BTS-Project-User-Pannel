import { push } from "react-router-redux";
import { createLogic } from "redux-logic";
import { AuthLogic } from "./auth";
import { FoodTypesLogic } from "./Menu/FoodType";
import { FilterTypeLogic } from "./Menu/Fillter";
import {CategoriesLogic} from "./Menu/Cetegory";
import {ListItemsLogic} from "./Menu/Items";
import {DayScheduleLogic} from "./Checout/DaySchedule";
import {OptionsLogic} from "./Menu/Options";
import {CartLogic} from "./Checout/Cart";
import {CheckOutLogic} from "./Checout/Order";
import {ChargesLogic} from "./Checout/Charges";
import {DiscountCardLogic} from "./Checout/Discount";
import {CheckoutServiceLogic} from "./Checout/Checkout";
export const redirectToLogic = createLogic({
  type: "REDIRET_TO",
  async process({ action }, dispatch, done) {
    dispatch(push(action.payload.path));
    done();
  },
});

export default [
  ...AuthLogic,
  ...FoodTypesLogic,
  ...FilterTypeLogic,
  ...CategoriesLogic,
  ...ListItemsLogic,
  ...DayScheduleLogic,
  ...OptionsLogic,
  ...CartLogic,
  ...CheckOutLogic,
  ...ChargesLogic,
  ...DiscountCardLogic,
  ...CheckoutServiceLogic,
  redirectToLogic,
];
