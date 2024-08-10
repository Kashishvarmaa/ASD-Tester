import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // Initial greeting message
    if (messages.length === 0) {
      setMessages([{ content: "Hello! I'm your personal AI assistant. How can I help you today?", isUser: false }]);
    }
  }, [messages]);

  const addMessage = (content, isUser = false) => {
    setMessages(prevMessages => [...prevMessages, { content, isUser }]);
  };

  const handleUserInput = () => {
    if (userInput.trim()) {
      addMessage(userInput, true);
      setUserInput('');
      setIsSending(true);
      // Simulate AI response
      setTimeout(() => {
        addMessage("I'm your personal AI assistant. How can I help you today?");
        setIsSending(false);
      }, 1000);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ flex: 1, overflowY: 'scroll', p: 2 }}>
        {messages.map((msg, index) => (
          <Paper key={index} sx={{ p: 2, mb: 1, backgroundColor: msg.isUser ? 'lightblue' : 'lightgray' }}>
            <Typography>{msg.content}</Typography>
          </Paper>
        ))}
      </Box>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          placeholder="Type your message..."
          fullWidth
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !isSending) {
              handleUserInput();
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
          onClick={handleUserInput}
          disabled={isSending}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chatbot;
