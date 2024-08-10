import React from 'react';
import { Box, Typography, Container } from "@mui/material";
import Topbar from "../../component/Dashboard/Topbar";
import Sidebar from "../../component/Dashboard/Sidebar";
import Chatbot from '../../component/Chatbot/Chatbot'; // Adjust the path as needed

const ChatbotPage = () => {
  return (
    <div className="app">
      <Sidebar />
      <main className='content'>
        <Topbar />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'center',
          }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ m: "5px 25px" }}
          >
            Chatbot
          </Typography>
          <Typography
            variant="h5"
            sx={{ m: "0px 25px" }}
          >
            Interact with our AI chatbot
          </Typography>
          <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
            <Chatbot />
          </Container>
        </Box>
      </main>
    </div>
  );
};

export default ChatbotPage;
