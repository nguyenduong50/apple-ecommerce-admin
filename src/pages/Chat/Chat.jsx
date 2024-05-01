import { useEffect, useState } from "react";
import socketIOClient from 'socket.io-client'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { fetchMessageRoomAPI, fetchRoomChatAPI } from "~/api/chat";
import Stack from '@mui/material/Stack';
import { fetchSendMessageAPI } from '~/api/chat';

const ChatPage = () => {
  const [roomChats, setRoomChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const currentRoomComponent = localStorage.getItem('currentRoom') || '';
  let socket = socketIOClient('http://localhost:5000', {credentials: 'includes'});

  const joinRoomChat = async(roomChatId) => {
    try {
      setMessages([]);
      const response = await fetchMessageRoomAPI(roomChatId);
      setMessages(response)
      socket.emit('join-room', roomChatId);
      localStorage.setItem('currentRoom', roomChatId)
      setMessage('');
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const messageHandle = async() => {
    const currentRoom = localStorage.getItem('currentRoom') || '';
    const messageReq = {
      roomId: currentRoom,
      userId: currentUser._id,
      content: message
    }
    await fetchSendMessageAPI(messageReq);
    socket.emit('send-message', messageReq)
    setMessages(prev => prev.concat({content: message, userId: currentUser._id}))
    setMessage('');
  }

  const keyHandleMessage = (event) => {
    if(event.key === 'Enter'){
      messageHandle();
    }
  }

  useEffect(() => {
    socket.on('response-message', data => {
      const currentRoom = localStorage.getItem('currentRoom') || '';
      if(data.userId !== currentUser?._id && data.roomId === currentRoom){
        setMessages(prev => prev.concat(data))
      }
    })
  },[socket, currentUser])

  useEffect(() => {
    const fetchRoomChat = async() => {
      try {
        const response = await fetchRoomChatAPI();
        setRoomChats(response)
      } catch (error) {
        console.log(error.response.data)
      }
    }

    fetchRoomChat();
  }, [])

  return (
    <>
      <Box sx={{ flexGrow: 1}} height='100%'>
        <Grid container spacing={1} height='100%'>
          <Grid item xs={2} sx={{borderRight: '1px solid rgba(236, 240, 241,1.0)'}}>
            {
              roomChats.length > 0 && 
              roomChats.map(roomchat => (
                <Stack 
                  spacing={0} 
                  key={roomchat._id} 
                  sx={{
                    borderBottom: '1px solid rgba(236, 240, 241,1.0)', 
                    cursor: 'pointer', 
                    padding: '15px 10px',
                    backgroundColor: roomchat._id === currentRoomComponent ? 'rgba(236, 240, 241,1.0)' : ''
                  }}
                  onClick={() => joinRoomChat(roomchat._id)}
                >
                  {roomchat.name}
                </Stack>
              ))
            }
          </Grid>
          <Grid item xs={10}>
            <Box sx={{height: '95%', borderBottom: '1px solid rgba(236, 240, 241,1.0)'}}>
            {
              messages.length > 0 &&
              messages?.map((message, index) => {
                if (message.userId === currentUser?._id) {
                  return(
                    <div key={index} style={{display: 'flex', justifyContent: 'end'}}>
                      <span style={{backgroundColor: '#eef5ff', padding: '10px 15px', margin: '5px 0px'}}>You: {message.content}</span>
                    </div>
                  )
                }

                if (message.userId !== currentUser._id) {
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