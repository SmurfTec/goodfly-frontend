import UseLocalStorage from 'Hooks/useLocalStorage';
import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router';
import { handleCatch, makeReq, API_BASE_URL } from 'Utils/constants';
import axios from 'axios';
// import { AuthContext } from './AuthContext';

export const StoreContext = React.createContext();

export const StoreProvider = withRouter(({ children, history }) => {
  // const { user } = useContext(AuthContext);
  const [products, setProducts] = useState();
  const [cart, setCart, resetCart] = UseLocalStorage('cart');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/products`);
        setProducts(res.data.products);
      } catch (err) {
        setProducts([]);

        handleCatch(err);
      }
    })();
  }, []);

  const addItemToCart = (item, quantity) => {
    // * If Item is Already in Cart , then increase quantity
    const alreadyInCart = !!cart?.find((el) => el.id === item.id);
    if (alreadyInCart)
      setCart((st) =>
        st.map((el) =>
          el._id === item._id
            ? {
                ...el,
                quantity: el.quantity + quantity,
                subTotal: el.price * (el.quantity + quantity),
              }
            : el
        )
      );
    else
      setCart((st) =>
        st
          ? [...st, item]
          : [{ ...item, quantity, subTotal: item.price * quantity }]
      );
  };

  const removeItemFromCart = (id) => {
    setCart((st) => st?.filter((item) => item.id === id));
  };

  const increaseQuantity = (itemId) => {
    setCart((st) =>
      st.map((el) =>
        el._id === itemId
          ? {
              ...el,
              quantity: el.quantity + 1,
              subTotal: el.price * (el.quantity + 1),
            }
          : el
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCart((st) =>
      st.map((el) =>
        el._id === itemId
          ? {
              ...el,
              quantity: el.quantity - 1,
              subTotal: el.price * (el.quantity - 1),
            }
          : el
      )
    );
  };

  return (
    <StoreContext.Provider
      displayName='Store Context'
      value={{
        products,
        cart,
        resetCart,
        addItemToCart,
        removeItemFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
});
