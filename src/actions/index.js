import { createAction } from "redux-actions";

export * from "./User/auth";
export * from "./Menu/FoodType";
export * from "./Menu/Category";
export * from "./Menu/Fillter";
export * from "./Menu/Iteam";
export const redirectTo = createAction("REDIRET_TO");

export const showLoader = createAction("SHOW_LOADER");

export const hideLoader = createAction("HIDE_LOADER");