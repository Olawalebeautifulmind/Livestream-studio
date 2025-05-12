import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useSocket } from '../hooks/useSocket';

const Chat = ({ streamId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const { sendMessage, onNewMessage } = useSocket(streamId);

  useEffect(() => {
    const cleanup = onNewMessage((message) => {
      setMessages((prev) => [...prev, message]);
    });
    return cleanup;
  }, [onNewMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Live Chat
      </Typography>
      <Divider />
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          mb: 2,
          maxHeight: '400px',
        }}
      >
        <List>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={message.user.username}
                secondary={message.message}
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>
      <Box
        component="form"
        onSubmit={handleSendMessage}
        sx={{ display: 'flex', gap: 1 }}
      >
        <TextField
          fullWidth
          size="small"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          variant="outlined"
        />
        <IconButton
          type="submit"
          color="primary"
          disabled={!newMessage.trim()}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Chat; 