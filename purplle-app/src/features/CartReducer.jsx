export const totalItem = (cart) => {
  return cart.reduce((sum, product) => sum + product.quantity, 0);
};

export const totalPrice = (cart) => {
  return cart.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );
};

const CartReducer = (state, action) => {
  switch (action.type) {

    case "SET_CART":
      return action.payload;

    case "Add": {
      const exist = state.find(
        (item) => item._id === action.product._id.toString()
      );

      if (exist) {
        return state.map((item) =>
          item._id === action.product._id.toString()
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...state,
        {
          _id: action.product._id.toString(),
          name: action.product.name,
          price: action.product.price,
          imageUrl: action.product.imageUrl,
          quantity: 1
        }
      ];
    }

    case "Remove":
      return state.filter(p => p._id !== action.id);

    case "Increase":
      return state.map(p =>
        p._id === action.id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      );

    case "Decrease":
      return state.map(p =>
        p._id === action.id && p.quantity > 1
          ? { ...p, quantity: p.quantity - 1 }
          : p
      );

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};
export default CartReducer;