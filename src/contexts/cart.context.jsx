import { useState, createContext, useEffect } from "react";

const addCartItem = (cartItem, productToAdd) => {
  // find if cartItems containes productToAdd
  const existingCartItem = cartItem.find((item) => {
    return item.id === productToAdd.id;
  });

  //If found, increment quantity
  if (existingCartItem) {
    return cartItem.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }
  //return new array with modified cartItems
  return [...cartItem, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItem, productToRemove) => {
  return cartItem
    .map((item) => {
      if (item.id === productToRemove.id && item.quantity >= 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    })
    .filter((item) => item.quantity > 0);
};

const deleteCartItem = (cartItem, productToDelete) => {
  return cartItem.filter((item) => item.id !== productToDelete.id);
};

export const InCartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItem: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  total: 0,
  setTotal: () => {},
});

export const InCartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotal] = useState(0);
  const addItemToCart = (productToAdd) => {
    setCartItem(addCartItem(cartItem, productToAdd));
  };
  const removeItemFromCart = (productToRemove) => {
    setCartItem(removeCartItem(cartItem, productToRemove));
  };
  const deleteItemFromCart = (productToDelete) => {
    setCartItem(deleteCartItem(cartItem, productToDelete));
  };

  useEffect(() => {
    const newCartCount = cartItem.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0,
    );
    const totalPrice = cartItem.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0,
    );

    setTotal(totalPrice);
    setCartCount(newCartCount);
  }, [cartItem]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItem,
    cartCount,
    removeItemFromCart,
    deleteItemFromCart,
    totalPrice,
  };
  return (
    <InCartContext.Provider value={value}>{children}</InCartContext.Provider>
  );
};
