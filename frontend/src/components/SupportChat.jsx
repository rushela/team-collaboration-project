// src/components/SupportChat.jsx

import React, { useState } from 'react';
import {
  IconButton,
  Box,
  Input,
  Button,
  VStack,
  Text,
  HStack
} from '@chakra-ui/react';
import { AiOutlineWechat, AiOutlineClose } from 'react-icons/ai';
import { MdEmail, MdPhone } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';

const SupportChat = () => {
  const [isOpen, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello!' }
  ]);
  const [input, setInput] = useState('');

  const toggle = () => setOpen(o => !o);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const txt = input;
    setInput('');
    setMessages(ms => [...ms, { from: 'user', text: txt }]);

    // Enhanced lock-keyword detection
    if (/lock|locking|locked|blocked|restrict|restricted|access denied|cant access|can't access|unable to access/i.test(txt)) {
      setMessages(ms => [
        ...ms,
        { from: 'bot', text: 'If your account is locked or you need admin assistance, you can contact admin:' }
      ]);
      return;
    }

    // otherwise call AI
    try {
      const res = await axios.post(
        'http://localhost:5000/api/support',
        { message: txt },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessages(ms => [...ms, { from: 'bot', text: res.data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages(ms => [
        ...ms,
        { from: 'bot', text: 'Sorry—support is temporarily unavailable.' }
      ]);
    }
  };

  const handleEmailClick = () => {
    window.location.href = 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox/FMfcgzQbdrXLXwVTxcwpqQPqLZDcpjGW?compose=GTvVlcSKkVTSqgbHWdRDxKrmbHlsGSTZqdCNwvVBnTkFQPWWzzMhVQJgvzBSWxKQZLggxZFVsbdNv';
  };

  const renderBotMessage = (msg) => {
    // contact card
    if (msg.includes('contact admin')) {
      return (
        <VStack align="start" spacing={2}>
          <Text whiteSpace="pre-wrap">{msg}</Text>
          <Button
            leftIcon={<MdEmail />}
            size="sm"
            variant="outline"
            width="100%"
            onClick={handleEmailClick}
          >
            Email Admin
          </Button>
          <Button
            leftIcon={<MdPhone />}
            size="sm"
            variant="outline"
            width="100%"
            onClick={() => window.location.href = 'tel:+94766902338'}
          >
            Call Admin
          </Button>
          <Button
            leftIcon={<FaWhatsapp />}
            size="sm"
            variant="outline"
            width="100%"
            onClick={() => window.open('https://wa.me/qr/T3SKJNU7JK2XC1', '_blank')}
          >
            WhatsApp Admin
          </Button>
        </VStack>
      );
    }
    // normal text
    return <Text whiteSpace="pre-wrap">{msg}</Text>;
  };

  return (
    <>
      {/* chat toggle */}
      <IconButton
        icon={<AiOutlineWechat />}
        colorScheme="teal"
        position="fixed"
        bottom="20px"
        right="20px"
        borderRadius="full"
        size="lg"
        aria-label="Support"
        onClick={toggle}
        zIndex="1000"
      />

      {isOpen && (
        <Box
          position="fixed"
          bottom="80px"
          right="20px"
          w="300px"
          h="400px"
          bg="white"
          borderRadius="md"
          boxShadow="xl"
          display="flex"
          flexDirection="column"
          zIndex="1000"
        >
          {/* header */}
          <HStack
            p={2}
            borderBottomWidth="1px"
            justify="space-between"
          >
            <Text fontWeight="bold">Support</Text>
            <IconButton
              icon={<AiOutlineClose />}
              size="sm"
              variant="ghost"
              aria-label="Close"
              onClick={toggle}
            />
          </HStack>

          {/* messages */}
          <Box flex="1" p={2} overflowY="auto">
            <VStack spacing={3} align="stretch">
              {messages.map((m, i) => (
                <Box
                  key={i}
                  alignSelf={m.from === 'user' ? 'flex-end' : 'flex-start'}
                  bg={m.from === 'user' ? 'blue.100' : 'gray.100'}
                  p={2}
                  borderRadius="md"
                  maxW="80%"
                >
                  {m.from === 'bot'
                    ? renderBotMessage(m.text)
                    : <Text>{m.text}</Text>}
                </Box>
              ))}
            </VStack>
          </Box>

          {/* input */}
          <Box p={2} borderTopWidth="1px">
            <HStack>
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                flex="1"
              />
              <Button onClick={sendMessage}>Send</Button>
            </HStack>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SupportChat;
