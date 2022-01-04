import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { Button, Container, Skeleton } from '@material-ui/core';
import { SocketContext } from 'Contexts/SocketContext';
import v4 from 'uuid/dist/v4';
import clsx from 'clsx';
import useInput from 'Hooks/useInput';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '100%',
    boxShadow: 'unset',
    padding: 20,
    background: '#f2f2f2',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  searchField: {
    '& .MuiInputBase-root': {
      backgroundColor: '#fff',
      borderRadius: 10,
    },
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
    paddingInline: 20,
  },
  messageBox: {
    display: 'flex',
    alignItems: 'flex-start',
    columnGap: 20,
    padding: 0,
  },
  message: {
    width: '50%',
    // marginLeft: 'auto',
    color: '#4d4d4d',
    background: '#f2f2f2',
    borderRadius: 20,
    marginBottom: '1rem',
    padding: 10,
    '& p': {
      fontSize: 12,
    },
    '& span': {
      fontSize: 14,
    },
  },
  myMessage: {
    marginLeft: 'auto',
  },
  otherMessage: {
    marginRight: 'auto',
  },
});

const Chat = () => {
  const classes = useStyles();
  const { chat, sendNewMessage, user } = useContext(SocketContext);
  const [messageTxt, setMessage] = useState('');

  const resetMessageTxt = (e) => {
    setMessage('');
  };

  const handleTxtChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const messagedContainer = document.getElementById('messageArea');
    messagedContainer.scrollTop = messagedContainer.scrollHeight;
  }, [chat?.messages]);

  const handleCreateMessage = (e) => {
    e.preventDefault();

    sendNewMessage({ text: messageTxt }, chat._id);

    resetMessageTxt();
  };

  return (
    <Container sx={{ mt: -2, mb: 3 }}>
      <Grid container>
        {/*  <Grid item xs={12}>
          <Typography variant='h5' className='header-message'>
            Chat
          </Typography>
        </Grid>*/}
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <Divider />
          <Grid item xs={12} sx={{ margin: 1, marginLeft: 0 }}>
            <TextField
              id='outlined-basic-email'
              label='Search'
              variant='outlined'
              fullWidth
              size='small'
              sx={{ marginBottom: 2 }}
              className={classes.searchField}
            />
          </Grid>
          <Divider />
          <List>
            {/* {1 === 5 */}
            {console.log(`chat`, chat)}
            {chat ? (
              <ListItem
                button
                sx={{ marginBlock: 2 }}
                data-selected={chat._id}
                sx={{
                  backgroundColor: '#cccccc !important',
                }}
              >
                <ListItemIcon>
                  <Avatar
                    alt='Remy Sharp'
                    src={`https://ui-avatars.com/api/?rounded=true&name=Goodfly+Agent`}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={'Goodfly Agent'}
                  secondary={chat.messages[
                    chat.messages.length - 1
                  ]?.text.slice(0, 15)}
                />
                <ListItemText
                  secondary={'08:55'}
                  align='right'
                  // secondary={new Date(
                  //   chat.messages[chat.messages.length - 1].createdAt
                  // ).toTimeString()}
                  // align='right'
                ></ListItemText>
              </ListItem>
            ) : (
              <Skeleton
                key={v4()}
                variant='rect'
                width='200px'
                height='50px'
                sx={{
                  marginBottom: 2,
                  marginInline: 'auto',
                  borderRadius: '5px',
                }}
              />
            )}
          </List>
        </Grid>
        <Grid item xs={9} sx={{ backgroundColor: '#fff' }}>
          <List id='messageArea' className={classes.messageArea}>
            {chat?.messages &&
              chat.messages.map((message) => (
                <React.Fragment>
                  <ListItem
                    key={message._id}
                    component={Box}
                    className={classes.messageBox}
                  >
                    {message.sender === 'goodfly' && (
                      <ListItemIcon>
                        <Avatar
                          alt={chat?.visitor?.fullName}
                          src={`https://ui-avatars.com/api/?rounded=true&name=goodlfly-agent`}
                          style={{
                            height: 50,
                            width: 50,
                          }}
                        />
                      </ListItemIcon>
                    )}
                    <Grid
                      container
                      className={classes.message}
                      className={clsx(classes.message, {
                        // classes.drawer is applied always
                        [classes.myMessage]: message.sender !== 'goodfly', // classes.drawerOpen is applied always, bool = true
                        [classes.otherMessage]: message.sender === 'goodfly', // you can also use boolean variable
                      })}
                    >
                      <Grid item xs={12}>
                        <ListItemText
                          align={
                            message.sender !== 'goodfly' ? 'right' : 'left'
                          }
                          primary={message.text}
                        ></ListItemText>
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText
                          align={
                            message.sender === 'goodfly' ? 'right' : 'left'
                          }
                          secondary={new Date(
                            message.createdAt
                          ).toLocaleString()}
                        ></ListItemText>
                      </Grid>
                    </Grid>
                    {message.sender !== 'goodfly' && (
                      <ListItemIcon>
                        <Avatar
                          alt='Remy Sharp'
                          src={
                            user?.photo ||
                            `https://ui-avatars.com/api/?rounded=true&name=${user?.fullName
                              .split(' ')
                              .join('+')}`
                          }
                          style={{
                            height: 50,
                            width: 50,
                          }}
                        />
                      </ListItemIcon>
                    )}
                  </ListItem>
                </React.Fragment>
              ))}
          </List>
          <Divider />
          {chat && (
            <Grid container style={{ padding: '20px', alignItems: 'center' }}>
              <Grid item xs={11}>
                <form id='messageForm' onSubmit={handleCreateMessage}>
                  <TextField
                    id='outlined-basic-email'
                    label='Type Something'
                    fullWidth
                    value={messageTxt}
                    onChange={handleTxtChange}
                    required
                  />
                </form>
              </Grid>
              <Grid xs={1} align='right'>
                <Button
                  color='primary'
                  aria-label='add'
                  type='submit'
                  form='messageForm'
                  variant='contained'
                  sx={{ marginLeft: 1 }}
                >
                  <SendIcon />
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
