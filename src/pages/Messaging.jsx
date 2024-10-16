// src/pages/Messaging.jsx

import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Box,
  CircularProgress,
  Paper,
} from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Messaging = () => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState(false);

  const fetchConversations = async () => {
    try {
      const res = await axios.get('/api/messaging/conversations'); // Ensure this endpoint exists
      setConversations(res.data);
      setLoadingConversations(false);
    } catch (err) {
      console.error('Error fetching conversations:', err);
      setError(true);
      setLoadingConversations(false);
    }
  };

  const fetchMessages = async (conversationId) => {
    setLoadingMessages(true);
    try {
      const res = await axios.get(`/api/messaging/conversations/${conversationId}/messages`); // Ensure this endpoint exists
      setMessages(res.data);
      setLoadingMessages(false);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError(true);
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const selectConversation = (conversation) => {
    setActiveConversation(conversation);
    fetchMessages(conversation._id);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await axios.post(
        `/api/messaging/conversations/${activeConversation._id}/messages`,
        { content: newMessage }
      );
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message.');
    }
  };

  if (loadingConversations) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error" align="center" mt={5}>
          Failed to load messaging. Please try again later.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={4}>
        Messaging
      </Typography>
      <Box display="flex" mt={2}>
        {/* Conversations List */}
        <Box width="30%" mr={2}>
          <Typography variant="h6">Conversations</Typography>
          <List component={Paper} style={{ maxHeight: '70vh', overflow: 'auto' }}>
            {conversations.map((conversation) => (
              <ListItem
                button
                key={conversation._id}
                selected={activeConversation && activeConversation._id === conversation._id}
                onClick={() => selectConversation(conversation)}
              >
                <ListItemText
                  primary={conversation.participant.name}
                  secondary={conversation.latestMessage?.content.substring(0, 50) + '...'}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Messages Window */}
        <Box width="70%">
          {activeConversation ? (
            <>
              <Typography variant="h6">
                Conversation with {activeConversation.participant.name}
              </Typography>
              <Paper style={{ height: '60vh', overflow: 'auto', padding: '16px', marginTop: '8px' }}>
                {loadingMessages ? (
                  <Box display="flex" justifyContent="center" mt={2}>
                    <CircularProgress />
                  </Box>
                ) : (
                  messages.map((msg) => (
                    <Box
                      key={msg._id}
                      display="flex"
                      justifyContent={msg.sender._id === user._id ? 'flex-end' : 'flex-start'}
                      mb={2}
                    >
                      <Box
                        bgcolor={msg.sender._id === user._id ? 'primary.main' : 'grey.300'}
                        color={msg.sender._id === user._id ? 'white' : 'black'}
                        p={1}
                        borderRadius={2}
                        maxWidth="70%"
                      >
                        <Typography variant="body1">{msg.content}</Typography>
                        <Typography variant="caption" align="right" display="block">
                          {new Date(msg.createdAt).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                )}
              </Paper>
              <Box display="flex" mt={2}>
                <TextField
                  label="Type your message..."
                  variant="outlined"
                  fullWidth
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <Button variant="contained" color="primary" onClick={sendMessage} style={{ marginLeft: '8px' }}>
                  Send
                </Button>
              </Box>
            </>
          ) : (
            <Typography variant="body1" align="center" mt={5}>
              Select a conversation to start messaging.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Messaging;
