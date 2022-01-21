import { createContext, useContext, useEffect, useState } from 'react';

import socketIo from 'socket.io-client';
import { AuthContext } from './AuthContext';
import { API_BASE_ORIGIN, makeReq } from 'Utils/constants';

export const SocketContext = createContext();

export const SocketProvider = (props) => {
  const [socket, setSocket] = useState();
  const { user, setUser, token } = useContext(AuthContext);

  const [chat, setChat] = useState();

  //* socket connection
  useEffect(() => {
    // socket = socketIo.connect('https://mern-chat-project.herokuapp.com', {
    const newSocket = socketIo.connect(API_BASE_ORIGIN, {
      transports: ['websocket'],
    });
    setSocket(newSocket);
    if (!newSocket) return;
    newSocket.on('connect', () => {
      console.log(`Hurrah Socket ${newSocket.id} Connected`);
    });
  }, []);

  useEffect(() => {
    if (!socket) return;
    if (!user || user === null) return;

    socket.on('newNotification', (data) => {
      // console.log(`data`, data);

      console.log(` data?.userId?.toString()`, data?.userId?.toString());
      console.log(`user._id`, user._id);

      if (data?.userId?.toString().trim() !== user?._id.toString().trim())
        return;
      // if (JSON.stringify(data.user._id) !== JSON.stringify(user._id)) return;

      const newUser = {
        ...user,
        notifications: user.notifications
          ? [data.newNotification, ...user.notifications]
          : [data.newNotification],
      };
      console.log(`newUser`, newUser);
      setUser(newUser);
    });

    socket.on('newMessage', ({ chatId, message, userId }) => {
      console.log(`newMessage received :`, message);
      console.log(`chatId :`, chatId);
      console.log(`userId :`, userId);
      // * Push New Message to that chat
      if (userId === user._id)
        setChat((st) => ({ messages: [...st.messages, message] }));
    });
  }, [socket, user]);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const resData = await makeReq('/chat/me');
      setChat(resData.chats);
    })();
  }, [user]);

  const sendNewMessage = (msg, chatId) => {
    console.log(`msg`, msg);
    console.log(`chatId`, chatId);
    socket.emit('newMessage', { ...msg, token, chatId });
  };

  return (
    <SocketContext.Provider
      displayName='Socket Context'
      value={{ socket, sendNewMessage, chat }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};
