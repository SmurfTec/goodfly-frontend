import UseLocalStorage from 'Hooks/useLocalStorage';
import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router';
import { handleCatch, makeReq, API_BASE_URL } from 'Utils/constants';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const StoreContext = React.createContext();

export const StoreProvider = withRouter(({ children, history }) => {
  const { user } = useContext(AuthContext);
  const initialState = {
    orderItems: [],
    subTotal: 0,
    total: 0,
    shippingPrice: 0,
    billingaddress: user?.address || '',
  };

  const [products, setProducts] = useState();
  const [cart, setCart, resetCart] = UseLocalStorage(
    'cart',
    initialState
  );

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

  useEffect(() => {
    if (cart?.orderItems.length > 0) {
      const addReducer = (accumulator, currentValue) =>
        accumulator + currentValue;

      console.log(`cart.orderItems`, cart.orderItems);

      let totalPrice = cart.orderItems.map(
        (el) => el.price * el.quantity * 1
      );

      totalPrice = totalPrice.reduce(addReducer);
      console.log(`totalPrice`, totalPrice);
      console.log(
        `totalPrice + st.shippingPrice`,
        cart.shippingPrice
      );
      setCart((st) => ({
        ...st,
        subTotal: totalPrice,
        total: totalPrice + st.shippingPrice,
      }));
    }

    window.localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart.orderItems]);

  const addItemToCart = (item, quantity) => {
    console.log(`addItem`, item);
    // * If Item is Already in Cart , then increase quantity
    const alreadyInCart = !!cart.orderItems.find(
      (el) => el._id === item._id
    );
    console.log(`new item`, {
      ...item,
      quantity,
      subTotal: item.price * quantity,
    });
    if (alreadyInCart)
      setCart((st) => ({
        ...st,
        orderItems: st.orderItems.map((el) =>
          el._id === item._id
            ? {
                ...el,
                quantity: el.quantity + quantity,
                subTotal: el.price * (el.quantity + quantity),
              }
            : el
        ),
      }));
    else
      setCart((st) => ({
        ...st,
        orderItems: [
          ...st.orderItems,
          { ...item, quantity, subTotal: item.price * quantity },
        ],
      }));
  };

  const removeItemFromCart = (id) => {
    console.log(`id`, id);
    setCart((st) => ({
      ...st,
      orderItems: st.orderItems.filter((item) => item._id !== id),
    }));
  };

  const increaseQuantity = (itemId) => {
    setCart((st) => ({
      ...st,
      orderItems: st.orderItems.map((el) =>
        el._id === itemId
          ? {
              ...el,
              quantity: el.quantity + 1,
              subTotal: el.price * (el.quantity + 1),
            }
          : el
      ),
    }));
  };

  const decreaseQuantity = (itemId) => {
    setCart((st) => ({
      ...st,
      orderItems: st.orderItems.map((el) =>
        el._id === itemId
          ? {
              ...el,
              quantity: el.quantity - 1,
              subTotal: el.price * (el.quantity - 1),
            }
          : el
      ),
    }));
  };

  const changeShippingAmount = (amount) => {
    setCart((st) => ({ ...st, shippingPrice: amount * 1 }));
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
        changeShippingAmount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
});
