import UseLocalStorage from 'Hooks/useLocalStorage';
import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router';
import { handleCatch, makeReq, API_BASE_URL } from 'Utils/constants';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import useUpdateEffect from 'Hooks/useUpdateEffect';
import { toast } from 'react-toastify';

export const StoreContext = React.createContext();

export const StoreProvider = withRouter(({ children, history }) => {
  const { user } = useContext(AuthContext);
  const initialState = {
    orderItems: [],

    subTotal: 0,
    total: 0,
  };

  const [userOrders, setUserOrders] = useState();
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
  const [order, setOrder] = useState();

  const [productCategories, setProductCategories] = useState([]);

  // * Get User Orders if he gets Logged In
  useEffect(() => {
    if (!user) return;
    console.log(`user`, user);
    (async () => {
      try {
        const resData = await makeReq(`/orders/me`);
        // console.log(`resData`, resData);
        setUserOrders(resData.orders);
      } catch (err) {
        console.log(`err`, err);
      }
    })();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/products`);
      setProducts(res.data.products);
    } catch (err) {
      setProducts([]);

      handleCatch(err);
    }
  };

  const fetchProductCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/products/category`);
      setProductCategories(res.data.categories);
    } catch (err) {
      setProductCategories([]);

      handleCatch(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchProductCategories();
  }, []);

  // useEffect(() => {
  useUpdateEffect(() => {
    if (cart?.orderItems.length > 0) {
      const addReducer = (accumulator, currentValue) =>
        accumulator + currentValue;

      // console.log(`cart.orderItems`, cart.orderItems);

      let totalPrice = cart.orderItems.map((el) => el.price * el.quantity * 1);

      totalPrice = totalPrice.reduce(addReducer);
      // console.log(`totalPrice`, totalPrice);
      setCart((st) => ({
        ...st,
        subTotal: totalPrice,
        total: totalPrice,
      }));
    }

    window.localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart.orderItems]);

  const addItemToCart = (item, quantity) => {
    // console.log(`addItem`, item);
    // * If Item is Already in Cart , then increase quantity
    const alreadyInCart = !!cart.orderItems.find((el) => el._id === item._id);
    // console.log(`new item`, {
    //   ...item,
    //   quantity,
    //   subTotal: item.price * quantity,
    // });
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
    // console.log(`id`, id);
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

  const payOrder = async (orderId, url) => {
    const resData = await makeReq(`/orders/pay/${orderId}`, {}, 'PATCH');
    console.log(`resData`, resData);
    toast.success('Order Payed successfully');
    setOrder();

    // * Update User Orders
    setUserOrders([...userOrders, resData.order]);

    // * If Url is provided, then redirect
    if (url)
      setTimeout(() => {
        history.push(url);
      }, 1000);
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
        order,
        setOrder,
        userOrders,
        payOrder,
        setUserOrders,
        productCategories,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
});
