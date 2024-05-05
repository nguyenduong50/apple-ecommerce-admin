import { useEffect, useState } from "react";
import socketIOClient from 'socket.io-client'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { fetchMessageRoomAPI } from "~/api/chat";
import Stack from '@mui/material/Stack';
import { fetchSendMessageAPI } from '~/api/chat';
import Brightness1Icon from '@mui/icons-material/Brightness1';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [listUserOnline, setListUserOnline] = useState([]);
  const [currentUserChat, setCurrentUserChat] = useState(null);
  let socket = socketIOClient('http://localhost:5000', {credentials: 'includes'});

  const joinRoomChat = async(user) => {
    setCurrentUserChat(user);
    setMessages([])
    setMessage('');
    try {
      const response = await fetchMessageRoomAPI(user._id);
      setMessages(response)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const messageHandle = async() => {
    const messageReq = {
      userId: currentUserChat._id,
      content: message,
      isAdmin: true
    }
    await fetchSendMessageAPI(messageReq);
    socket.emit('send-message', messageReq)
    setMessages(prev => prev.concat({content: message, isAdmin: true}))
    setMessage('');
  }

  const keyHandleMessage = (event) => {
    if(event.key === 'Enter'){
      messageHandle();
    }
  }

  useEffect(() => {
    socket.on('get-message', data => {
      if(data.userId === currentUserChat?._id){
        setMessages(prev => prev.concat({content: data.content, isAdmin: false}))
      }
    })

    return () => {
      socket.off('get-message');
    };
  },[socket, currentUserChat])

  useEffect(() => {
    socket.on('user-online', data => {
      setListUserOnline(data)
      const listUserOnlineIndex = data.map(user => user._id);
      if(!listUserOnlineIndex.includes(currentUserChat)){
        setCurrentUserChat(null);
        setMessages([]);
      }
    })

    return () => {
      socket.off('user-online');
    };
  }, [socket])

  return (
    <>
      <Box sx={{ flexGrow: 1}} height='100%'>
        <Grid container spacing={1} height='100%'>
          <Grid item xs={2} sx={{borderRight: '1px solid rgba(236, 240, 241,1.0)'}}>
            {
              listUserOnline.length > 0 && 
              listUserOnline.map(user => (
                <Stack 
                  spacing={1} 
                  key={user._id} 
                  direction="row"
                  sx={{
                    borderBottom: '1px solid rgba(236, 240, 241,1.0)', 
                    cursor: 'pointer', 
                    padding: '15px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: user?._id === currentUserChat?._id ? 'rgba(236, 240, 241,1.0)' : ''
                  }}
                  onClick={() => joinRoomChat(user)}
                >
                  <span>{user.name}</span>
                  <Brightness1Icon fontSize="1" color="success" />
                </Stack>
              ))
            }
          </Grid>
          <Grid item xs={10}>
            <Box sx={{height: '95%', borderBottom: '1px solid rgba(236, 240, 241,1.0)'}}>
            {!currentUserChat && <p style={{fontWeight: 'bold'}}>Please choose room chat</p>}
            {
              messages.length > 0 && listUserOnline.length > 0 &&
              messages?.map((message, index) => {
                if (message.isAdmin === true) {
                  return(
                    <div key={index} style={{display: 'flex', justifyContent: 'end'}}>
                      <span style={{backgroundColor: '#eef5ff', padding: '10px 15px', margin: '5px 0px'}}>You: {message.content}</span>
                    </div>
                  )
                }

                if (message.isAdmin === false) {
                  return(
                    <div key={index} style={{display: 'flex', justifyContent: 'start'}}>
                      <span style={{backgroundColor: '#e4fbf8', padding: '10px 15px', margin: '5px 0px'}}>Client: {message.content}</span>
                    </div>
                  )
                }
              })
            }
            </Box>
            <Box>
              <input 
                type="text"
                placeholder='Type and enter'
                onKeyDown={keyHandleMessage} 
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                disabled= {currentUserChat ? false : true}
                style={{
                  border: '1px solid transparent',
                  borderBottomColor: 'rgba(236, 240, 241,1.0)',
                  outline: 'none',
                  width: '100%',
                  padding: '20px 10px'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ChatPage;