import {
  combineReducers,
  configureStore,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export type CalculatorHistory = {
  equation: string;
  timestamp: string;
};

export const saveHistory = createAction<CalculatorHistory>("CREATE_HISTORY");
const initialState: CalculatorHistory[] = [];
const calculatorHistoryReducer = createReducer(initialState, (builder) => {
  builder.addCase(saveHistory, (state, { payload }) => {
    return [payload, ...state];
  });
});

export const selectCalculatorHistory = (state: RootState) =>
  state.calculatorHistory;

const store = configureStore({
  reducer: combineReducers({
    calculatorHistory: calculatorHistoryReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
