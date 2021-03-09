import {
  combineReducers,
  configureStore,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import storage from "../storage";

export type CalculatorHistory = {
  equation: string;
  timestamp: string;
};

// ACTIONS

export const saveHistory = createAction<CalculatorHistory>("CREATE_HISTORY");
export const initializeHistory = createAction<CalculatorHistory[]>(
  "INITIALIZE_HISTORY"
);

// REDUCERS
const initialState: CalculatorHistory[] = [];
export const calculatorHistoryReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(initializeHistory, (_, { payload }) => {
        return payload;
      })
      .addCase(saveHistory, (state, { payload }) => {
        return [payload, ...state];
      });
  }
);

// SELECTORS
export const selectCalculatorHistory = (state: RootState) =>
  state.calculatorHistory;

const store = configureStore({
  reducer: combineReducers({
    calculatorHistory: calculatorHistoryReducer,
  }),
});

store.subscribe(() => {
  const state = store.getState();
  storage.setItem(state.calculatorHistory).catch(console.log);
});

storage.getItem().then((state) => {
  if (state) {
    store.dispatch(initializeHistory(JSON.parse(state)));
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
