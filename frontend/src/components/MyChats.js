import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Box, Button, Stack, useToast, Text, Image } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { ChatState } from '../Context/ChatProvider';
import ChatLoading from './ChatLoading';
import { getSender } from './Config/ChatsLogic';
import GroupChatModal from './miscellaneous/GroupChatModal';

const Mychats = ({ fetchAgain }) => {

  const [chatImgUser, setChatImgUser] = useState('');
  const [loggedUser, setLoggedUser] = useState();
  const { userToken, selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  console.log("Logged User: \n")
  console.log(loggedUser)

  var userImage;



  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      console.log(data);
      setChats(data);
      userImage = data?.flatMap((usersingle) => {
        if (usersingle?.users) {
          return usersingle?.users?.filter((userone) => userone._id !== user._id).flatMap((user) => user);
        }
      });
      setChatImgUser(userImage);
      // userImage.flatMap((user, index) => {
      //   console.log(40, "THisis i ss userImg \n", index, user.pic);
      // });
      // userImage = data?.user?.filter((user) => user._id !== loggedUser._id).map((user) => user.pic);
      // console.log(45, "THisis i ss userImg \n", userImage);
      // console.log("THisis i ss user \n" , user);

    } catch (error) {
      console.log(error)
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat, index) => (
              <Box
                display="flex"
                alignItems="center"
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Box display={'flex'} alignItems={'center'} >
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    // src={chat.isGroupChat ? 'https://via.placeholder.com/50' : chat?.users?.filter((SingleUser) => SingleUser._id !== loggedUser.existingUser._id)?.pic}
                    src={chat.isGroupChat ? 'https://via.placeholder.com/50' : chat?.users?.find(user => user._id !== loggedUser.existingUser._id)?.pic}
                    alt="Profile Image"
                  />
                  <Box ml={3}>
                    {/* <Text fontWeight="bold">
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text> */}

                    <Text fontWeight="bold" style={{marginBottom:'4px'}}>
                      {!chat.isGroupChat
                        ? null
                        : chat.chatName}
                    </Text>
                    {chat.latestMessage && (
                      <Box>
                        <Text fontSize="sm">
                          <b>{chat.users.find(user => user._id !== loggedUser.existingUser._id)?.name} : </b>
                          {chat.latestMessage.content.length > 50
                            ? chat.latestMessage.content.substring(0, 40) + "..."
                            : chat.latestMessage.content}
                        </Text>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default Mychats;