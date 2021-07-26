import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      // id und user muss man erstmal hardocen, den rest kriegt man aus der action
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };

    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        // die userId wird auch nicht aktualisiert
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        // der Preis wird nicht aktualisiert und daher einfach aus dem state übernommen
        state.userProducts[productIndex].price
      );
      // hier erstellt man erst einmal eine Kopie
      const updatetdUserProducts = [...state.userProducts];
      // hioermit überschreibt man an der Stelle dann das alte mit dem neuen Produkt (updatedProduct)
      updatetdUserProducts[productIndex] = updatedProduct;

      const availableProductIndex =  state.availableProducts.findIndex(
        (prod) => prod.id === action.pid
      );
       // hier erstellt man erst einmal eine Kopie
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts : updatedAvailableProducts,
        userProducts : updatetdUserProducts
      }

    case DELETE_PRODUCT:
      return {
        ...state,
        // hier filtern wird das gelöschte Produkt raus --> mit der pid, die durch die action mitgeliefert wird
        // in der cart muss das auch noch gemacht werden, damit das da auch rauslöscht!
        userProducts: state.userProducts.filter(
          (prod) => prod.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (prod) => prod.id !== action.pid
        ),
      };
  }
  return state;
};
