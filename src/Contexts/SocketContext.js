import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import socketIo from 'socket.io-client';
import { AuthContext } from './AuthContext';
import { API_BASE_ORIGIN } from 'Utils/constants';

export const SocketContext = createContext();

export const SocketProvider = (props) => {
  const [socket, setSocket] = useState();
  const { user, setUser } = useContext(AuthContext);

  //* socket connection
  useEffect(() => {
    console.log(' abcefh ');
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
      console.log(`data`, data);
      console.log(`user`, user);
      console.log(`user._id`, user._id);

      if (data?.userId !== JSON.stringify(user?._id)) return;
      // if (JSON.stringify(data.user._id) !== JSON.stringify(user._id)) return;

      console.log('updating user');
      const newUser = {
        ...user,
        notifications: user.notifications
          ? [...user.notifications, data.newNotification]
          : [data.newNotification],
      };
      console.log(`newUser`, newUser);
      setUser(newUser);
    });
  }, [socket, user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  );
};
