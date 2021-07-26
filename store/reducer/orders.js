import Order from "../../models/order";
import { ADD_ORDER } from "../actions/orders";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      // das date als Dummy ID erst einmal
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );
      return {
          ...state,
          //concat ist eine Array funktion --> die orders updaten
          orders: state.orders.concat(newOrder)
      }
  }
  return state;
};
