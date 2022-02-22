const Reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((item) => {
        return item.id !== action.payload;
      }),
    };
  }

  if (action.type === "INCREASE") {
    const tempCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return {
          ...item,
          amount: item.amount + 1,
        };
      }
      return item;
    });
    return {
      ...state,
      cart: tempCart,
    };
  }
  if (action.type === "DECREASE") {
    const tempCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      })
      .filter((item) => item.amount !== 0);
    return {
      ...state,
      cart: tempCart,
    };
  }
  return state;
};

export default Reducer;
