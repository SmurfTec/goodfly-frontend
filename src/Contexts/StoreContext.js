import UseLocalStorage from 'Hooks/useLocalStorage';
import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router';
import { handleCatch, makeReq, API_BASE_URL } from 'Utils/constants';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import useUpdateEffect from 'Hooks/useUpdateEffect';

export const StoreContext = React.createContext();

export const StoreProvider = withRouter(({ children, history }) => {
  const { user } = useContext(AuthContext);
  const initialState = {
    orderItems: [],

    subTotal: 0,
    total: 0,
  };
  // const orderInitialState = {
  //   orderItems: [],

  //   subTotal: 0,
  //   total: 0,
  //   subTotal: 0,
  //   total: 0,
  //   deliveryMethod: '',
  //   deliveryAddress: '',
  //   shippingAddress: {
  //     address: '',
  //     city: '',
  //     country: '',
  //     postalCode: '',
  //   },
  // };

  const [products, setProducts] = useState();
  const [cart, setCart, resetCart] = UseLocalStorage('cart', initialState);
  const [userOrders, setUserOrders] = useState();
  const [order, setOrder] = useState();

  // * Get User Orders if he gets Logged In
  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const resData = await makeReq(`/orders/me`);
          console.log(`resData`, resData);
          setUserOrders(resData.orders);
        } catch (err) {
          //  console.log(`err`, err)
        }
      })();
    } else {
      setUserOrders();
    }
  }, [user]);

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

  // useEffect(() => {
  useUpdateEffect(() => {
    if (cart?.orderItems.length > 0) {
      const addReducer = (accumulator, currentValue) =>
        accumulator + currentValue;

      console.log(`cart.orderItems`, cart.orderItems);

      let totalPrice = cart.orderItems.map((el) => el.price * el.quantity * 1);

      totalPrice = totalPrice.reduce(addReducer);
      console.log(`totalPrice`, totalPrice);
      setCart((st) => ({
        ...st,
        subTotal: totalPrice,
        total: totalPrice,
      }));
    } else {
      setCart(initialState);
    }

    window.localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart.orderItems]);

  const addItemToCart = (item, quantity) => {
    console.log(`addItem`, item);
    // * If Item is Already in Cart , then increase quantity
    const alreadyInCart = !!cart.orderItems.find((el) => el._id === item._id);
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

  // const changeShippingAmount = (amount) => {
  //   setCart((st) => ({ ...st, shippingPrice: amount * 1 }));
  // };

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
        order,
        setOrder,
        userOrders,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
});
