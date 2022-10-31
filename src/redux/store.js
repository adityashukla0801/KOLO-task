import {reducer}  from "./reducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

export const store = createStore(reducer, applyMiddleware(thunk));
