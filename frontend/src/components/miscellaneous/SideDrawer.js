import {
    Box,
    Button,
    ListItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Tooltip,
    useStatStyles,
    Text,
    Menu,
    MenuButton,
    Avatar,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Input,
    Toast,
    useToast,
    Spinner
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import Select from 'react-select';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import axios from 'axios';

import UserListItem from '../UserAvatar/UserListItem';
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import ChatLoading from '../ChatLoading';
import { getSender } from '../Config/ChatsLogic';
import languages from '../dataLanguages/languages'
import { Effect } from 'react-notification-badge';
import NotificationBadge from 'react-notification-badge';

const SideDrawer = () => {

    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.800'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )


    const { isOpen: isOpenTwo, onOpen: onOpenTwo, onClose: onCloseTwo } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)

    const [preferredLanguage, setPreferredLanguage] = useState('')
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { user, userToken, selectedChat, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();

    const navigate = useNavigate();
    const toast = useToast();

    console.log("User: \n")
    console.log(user);


    const currentUserData = JSON.parse(localStorage.getItem('userInfo'));
    console.log('Current User Data: \n', currentUserData)


    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Search field is empty",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            })
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            };

            const { data } = await axios.get(`/api/user?search=${search}`, config);
            console.log(data);
            setLoading(false);
            setSearchResult(data);

        } catch (error) {
            toast({
                title: "Something went wrong",
                description: 'failed to load the search result',
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            })
            console.log(error.message)
        }
    }

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    }

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            };

            const { data } = await axios.post("/api/chat", { userId }, config);

            if (!chats.find((c) => c._id === data._id)) {
                setChats([data, ...chats]);
            }

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();

        } catch (error) {
            console.log(error.message);
            toast({
                title: "Something went wrong",
                description: 'failed to load the chat',
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            })
        }
        console.log(userId);
    }

    const handlLanguageUpdate = async (language) => {
        console.log("Language Updated: \n")
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };

        const updatedData = {
            id: user._id,
            preferredLanguage: language
        }

        const { data } = await axios.patch(
            // `http://localhost:5000/api/user/updateLang`,
            `${process.env.REACT_APP_ENDPOINT}/api/user/updateLang`,
            updatedData,
            config
        );
        console.log("Updated Preferred Language: \n")
        console.log(data?.updatedPreferredLang?.preferredLanguage);
        // Get userInfo from localStorage
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));

        // Update preferredLanguage
        userInfo.existingUser.preferredLanguage = data?.updatedPreferredLang?.preferredLanguage;

        // Store userInfo back to localStorage
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        onCloseTwo();
    }



    const setPreferredLanguageFromCode = (languageCode) => {
        const language = languages.find(lang => lang.code === languageCode);
        if (language) {
            console.log(`The preferred language is ${language.name}`);
            setPreferredLanguage(language.name);
        } else {
            console.log('No language found for the given code');
        }
    };

    useEffect(() => {
        setPreferredLanguageFromCode(currentUserData?.existingUser?.preferredLanguage)
        console.log("User Preferred Language: \n")
        console.log(currentUserData?.existingUser?.preferredLanguage);
    }, [currentUserData?.existingUser?.preferredLanguage])

    return (
        <>
            <Box
                display="flex"
                justifyContent='space-between'
                alignItems='center'
                bg='white'
                w='100%'
                p='5px 10px 5px 10px'
                borderWidth='5px'
            >
                <Tooltip label="search users to chat" hasArrow placement='bottom-end' >
                    <Button variant='ghost' onClick={onOpen} >
                        <i class="fas fa-search"></i>
                        <Text d={{ base: "none", md: 'flex' }} px='4'>
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Box display={'flex'}>
                    <Text fontSize='2xl' fontFamily='Work sans' >
                        VishwaVarta
                    </Text>
                    <Box
                        marginLeft='10px'
                        marginTop="10px"

                    >
                        <GrLanguage
                            fontSize='2xl'

                            onClick={() => {
                                console.log("Language Dropdown Clicked")
                                onOpenTwo()
                            }}
                        />
                    </Box>
                </Box>
                <div>
                    <Menu>
                        <MenuButton p={1}
                        >
                            <NotificationBadge
                                count={notification.length}
                                effect={Effect.SCALE}
                            />
                            <BellIcon fontSize='2xl' m={1} />
                            {/* <ChevronDownIcon /> */}
                        </MenuButton>
                        <MenuList
                            pl={3}
                        >
                            {!notification.length && "No New Messages"}
                            {notification.map((n) => (
                                <MenuItem key={n?._id}
                                    onClick={() => {
                                        setSelectedChat(n?.chat);
                                        setNotification(notification.filter((noti) => noti._id !== n));
                                    }}
                                >
                                    {notification?.chat?.isGroupChat
                                        ? (`New Message in ${n?.chat?.chatName}`) :
                                        (
                                            `New Message from ${getSender(user, n?.chat?.users)} `
                                        )}
                                </MenuItem >

                            ))}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                        >
                            <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic} />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user} >
                                <MenuItem> My Profile </MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler} > Logout </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>


            <Drawer placement='left' onClose={onClose} isOpen={isOpen} >
                <DrawerOverlay />
                <DrawerContent >
                    <DrawerHeader borderBottomWidth='1px' >  Search Users </DrawerHeader>
                    <DrawerBody>
                        <Box display='flex' pb={2}>
                            <Input
                                placeholder='Search by name or email'
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={handleSearch}>
                                Go
                            </Button>
                        </Box>
                        {loading ?
                            (<ChatLoading />) :
                            (
                                searchResult?.map(user => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => accessChat(user._id)}
                                    />
                                ))
                            )
                        }

                        {loadingChat && <Spinner ml={'auto'} display={'flex'} />}
                    </DrawerBody>
                </DrawerContent>


            </Drawer>

            {/* Language Dropdown model start */}
            <>
                <Modal isCentered isOpen={isOpenTwo} onClose={onCloseTwo}>
                    {overlay}
                    <ModalContent>
                        <ModalHeader>Edit Language</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {/* <Text>  </Text> */}

                            <FormControl >
                                <FormLabel> Select Langauge for Translation </FormLabel>
                                <Select
                                    options={languages}
                                    value={languages.find((lang) => lang.name === preferredLanguage)}
                                    onChange={(e) => setPreferredLanguage(e.code)}
                                // onChange={(selectedOptions) =>
                                // setPreferredLanguage(selectedOptions.map((option) => option.value))
                                // }
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={() => {
                                    handlLanguageUpdate(preferredLanguage)
                                }}
                            > Update Language  </Button>
                            <Button onClick={onCloseTwo}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>

            {/* Language Dropdown model End */}

        </>
    )
}

export default SideDrawer
