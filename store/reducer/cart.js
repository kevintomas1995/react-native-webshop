import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      if (state.items[addedProduct.id]) {
        //already have the item in the cart
        const updatedCardItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedCardItem },
          totalAmount: state.totalAmount + productPrice,
        };
      } else {
        const newCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + productPrice,
        };
      }

    case REMOVE_FROM_CART:
      const currenQty = state.items[action.pid].quantity;
      let updatedCartItems;
      // Wenn man mehrere von einem Produkt im Warenkorb schon hat
      if (currenQty > 1) {
        // hier kopiert man die Items aus der Cart, bloß reduziert man die Anzahl um 1
        const updatedCartItem = new CartItem(
          state.items[action.pid].quantity - 1,
          state.items[action.pid].productPrice,
          state.items[action.pid].productTitle,
          state.items[action.pid].sum - state.items[action.pid].productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        // hier löscht man dann das gesamte Produkt raus, weil qty == 1
        updatedCartItems = { ...state.items };
        // löscht das Produkt mit der pid aus der Cart
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - state.items[action.pid].productPrice,
      };
    case ADD_ORDER:
      // das ist aus den order actions. Wenn man order now in der cart drückt, sollen die sachen in der cart raus: deshalb initialState
      return initialState;

    case DELETE_PRODUCT: 
    // wenn das zu löschende Produkt nicht in der Cart ist, dann wird einfach der aktuelle State returned
    if (!state.items[action.pid]) {
      return state;
    } 
    // wenn es drin ist, dann folgende Schritte zum Löschen
    const updatedItems = {...state.items};
    const itemTotal = state.items[action.pid].sum;
    delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal
      }
  }
  return state;
};
