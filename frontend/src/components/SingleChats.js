import React, { useEffect, useState } from 'react'
import {
    Box,
    FormControl,
    IconButton,
    Input,
    Stack,
    InputGroup,
    Spinner,
    Text,
    Toast,
    cookieStorageManager,
    useToast
} from '@chakra-ui/react';
import EmojiPicker from 'emoji-picker-react';

import { RiUserVoiceFill } from "react-icons/ri";
import { MdKeyboardVoice } from "react-icons/md";
import { FaLanguage } from "react-icons/fa";
import { IoMdSend } from 'react-icons/io';
import axios from 'axios';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Lottie from 'react-lottie';
import io from 'socket.io-client';

import CSS from '../components/SingleChats.module.css';
import { ChatState } from '../Context/ChatProvider'
import { getSender, getSenderFull } from './Config/ChatsLogic';
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import ScrollableChat from './ScrollableChat';
import animationData from './assets/animate/typing.json'


// const ENDPOINT = "http://localhost:5000";
const ENDPOINT = process.env.REACT_APP_ENDPOINT;
var socket, selectedChatCompare;



const SingleChats = ({ fetchAgain, setFetchAgain }) => {
    const { user, userToken, selectedChat, setSelectedChat, notification, setNotification } = ChatState();
    // const [emoji, setEmoji] = useState('')
    // const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [showTranslatedText, setShowTranslatedText] = useState(false);
    const [message, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false); // [typing,setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false); // [isTyping,setIsTyping] = useState(false);
    const toast = useToast();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };



    // const handleEmojiClick = (event, emojiObject) => {
    //     setNewMessage(newMessage + emojiObject.emoji);
    //     setShowEmojiPicker(false);
    // };

    const handleSpeechToText = () => {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.onstart = function () {
                console.log('Voice recognition started. Try speaking into the microphone.');
                setIsListening(true);
            };

            recognition.onend = function () {
                console.log('Voice recognition ended.');
                setIsListening(false);
            };

            recognition.onresult = function (event) {
                const transcript = event.results[0][0].transcript;
                setNewMessage(transcript); // assuming setNewMessage is your state setter for the message input
            };

            recognition.start();
        } else {
            console.log('Your browser does not support speech recognition.');
        }
    };

    // useEffect(() => {
    //     if(user){
    //         socket = io(ENDPOINT);
    //         socket.emit('setup', user?.result);
    //         socket.on('connected',() =>  setSocketConnected(true))
    //     }

    // },[user])

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('setup', user);
        socket.on('connected', () => setSocketConnected(true))
        socket.on('typing', () => setIsTyping(true))
        socket.on('stop typing', () => setIsTyping(false))
    }, [])



    const fetchMessages = async () => {
        if (!selectedChat) {
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            };

            setLoading(true);
            const { data } = await axios.get(`/api/messages/${selectedChat._id}`, config);
            setMessages(data)
            setLoading(false);

            socket.emit('join chat', selectedChat._id)
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "failed to load messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
        }
    }

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat])

    useEffect(() => {
        socket.on('message recieved', (newMessageRecieved) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                // give notifi
                // return console.log('selectedChatCompare or newMessageRecieved.chat._id not defined');
                if (!notification.includes(newMessageRecieved)) {
                    setNotification([newMessageRecieved, ...notification])
                    setFetchAgain(!fetchAgain);
                }
            } else {
                setMessages([...message, newMessageRecieved]);
            }
        })
    })

    const handleSendMessage = async (e) => {
        if (e.key === "Enter" || e.type === "click" && newMessage) {
            socket.emit('stop typing', selectedChat._id)
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`,
                    },
                }

                setNewMessage("");
                const { data } = await axios.post(`/api/messages`, {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config);

                socket.emit('new message', data);
                setMessages([...message, data]);

            } catch (error) {
                toast({
                    title: "Something went wrong",
                    description: "failed to send message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                })
            }
        }
    }


    const typingHandler = (e) => {
        setNewMessage(e.target.value);
        // typing indicator logic 
        if (!socketConnected) return

        if (!typing) {
            setTyping(true);
            socket.emit('typing', selectedChat._id)
        }

        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;         //  3 sec
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;

            if (timeDiff >= timerLength && typing) {
                socket.emit('stop typing', selectedChat._id)
                setTyping(false);
            }
        }, timerLength)
    }

    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "20px", md: "25px" }}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Work sans"
                        display='flex'
                        justifyContent={{ base: "space-between" }}
                        alignItems='center'
                    >
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                        />
                        {!selectedChat.isGroupChat ? (
                            <>
                                {/* {console.log(198,user)} */}
                                <Stack flexDir={'row'} fontFamily="Work sans">
                                    <>
                                        {getSender(user, selectedChat.users)}
                                        <IconButton
                                            padding={'5px'}
                                            icon={<FaLanguage />}
                                            size={'1x'}
                                            onClick={() => setShowTranslatedText(!showTranslatedText)}
                                        />
                                    </>
                                </Stack>
                                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                            </>
                        ) : (
                            <>
                                <Stack flexDir={'row'} fontFamily="Work sans">
                                    <>
                                        {selectedChat.chatName.toUpperCase()}
                                        <IconButton
                                            padding={'5px'}
                                            icon={<FaLanguage />}
                                            size={'1x'}
                                            onClick={() => setShowTranslatedText(!showTranslatedText)}
                                        />
                                    </>
                                </Stack>
                                <UpdateGroupChatModal
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                    fetchMessages={fetchMessages}
                                />
                            </>
                        )}
                    </Text>

                    <Box
                        display='flex'
                        flexDir='column'
                        justifyContent='flex-end'
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                        overflowY="hidden"
                    >
                        {loading ? (
                            <Spinner
                                size='xl'
                                w={20}
                                h={20}
                                alignSelf='center'
                                margin='auto'
                                color='blue.500'
                            />
                        ) : (
                            <div className={CSS.messages}>
                                <ScrollableChat
                                    showTranslated={showTranslatedText}
                                    messages={message}
                                />
                            </div>
                        )}

                        <FormControl
                            onKeyDown={handleSendMessage}
                            isRequired mt={3}
                        >
                            {isTyping ? <div> <Lottie
                                options={defaultOptions}
                                width={70}
                                style={{ merginBottom: '15', marginLeft: 0 }}


                            /> </div> : (
                                <></>
                            )}
                            <InputGroup >
                                <Input
                                    variant={'filled'}
                                    value={newMessage}
                                    bg="#E0E0E0"
                                    placeholder='Type a message .......'
                                    onChange={typingHandler}
                                />

{/* 
                                <Box style={{ margin: '6px', cursor: 'pointer' }} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                    {showEmojiPicker ? 'Close' : 'Emojis'}
                                </Box>
                                {showEmojiPicker && (
                                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                                )} */}
                                <Box style={{ margin: '6px', cursor: 'pointer' }} onClick={handleSpeechToText}>
                                    {isListening ? <RiUserVoiceFill size={'20'} style={{ marginTop: '4px' }} /> : <MdKeyboardVoice size={'30'} />}
                                </Box>
                                <Box style={{ margin: '6px', cursor: 'pointer' }} onClick={handleSendMessage}>
                                    <IoMdSend size={'30'} />
                                </Box>
                            </InputGroup>
                        </FormControl>
                    </Box>
                </>
            ) : (
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    h='100%'
                >
                    <Text fontSize='3xl' pb={3} fontFamily='Work sans'>
                        Click on a user to start Chatting
                    </Text>
                </Box>
            )}
        </>
    )
}

export default SingleChats