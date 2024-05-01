import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from '@chakra-ui/react';
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from './Config/ChatsLogic'
import { Avatar, Tooltip } from '@chakra-ui/react';
import { ChatState } from '../Context/ChatProvider';


const ScrollableChat = ({ messages, showTranslated }) => {
    const { user } = ChatState();
    const [translatedMessages, setTranslatedMessages] = useState(messages);
    
    const localLangugae = JSON.parse(localStorage.getItem('userInfo'));
    const preferredLanguageLocal = localLangugae?.existingUser?.preferredLanguage;
    
    for (let index = 0; index < 10; index++) {
        console.log(preferredLanguageLocal);
    }

    useEffect(() => {
        const translateMessages = async () => {
            const promises = messages.map(async (message) => {
                if (!message.translatedContent) {
                    const encodedParams = new URLSearchParams();
                    encodedParams.set('texte', message.content);
                    // encodedParams.set('to_lang', user.preferredLanguage);
                    encodedParams.set('to_lang', preferredLanguageLocal);

                    const options = {
                        method: 'POST',
                        url: 'https://free-google-translation.p.rapidapi.com/translate',
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded',
                            'X-RapidAPI-Key': process.env.REACT_APP_TRANSLATE_API_KEY,
                            'X-RapidAPI-Host': 'free-google-translation.p.rapidapi.com'
                        },
                        data: encodedParams,
                    };

                    try {
                        const response = await axios.request(options);
                        message.translatedContent = response.data.translation_data.translation;
                    } catch (error) {
                        console.error("Translation failed for message id: ", message._id);
                    }
                }
                return message;
            });
            const newMessages = await Promise.all(promises);
            setTranslatedMessages(newMessages);
        };

        translateMessages();
    }, [messages,preferredLanguageLocal]);

    return (
        <ScrollableFeed>
            {messages && messages.map((m, i) => (
                <div style={{ display: 'flex' }} key={m.id}>
                    {
                        (isSameSender(messages, m, i, user?._id)
                            || isLastMessage(messages, i, user?._id)) && (
                            <Tooltip label={m.sender.name} placement='bottom-start' hasArrow >
                                <Avatar
                                    mt='7px'
                                    mr={1}
                                    size="sm"
                                    cursor={'pointer'}
                                    name={m.sender.name}
                                    src={m.sender.pic}
                                />

                            </Tooltip>
                        )}
                    <span style={{
                        backgroundColor: `${m.sender._id === user?._id ? "#BEE3F8" : "#B9F5DO"
                            }`,

                        borderRadius: '20px',
                        padding: '5px 15px',
                        maxWidth: '75%',
                        marginLeft: isSameSenderMargin(messages, m, i, user?._id),
                        marginTop: isSameUser(messages, m, i, user?._id) ? 3 : 10,
                    }}>

                        {m.content}
                        <br />
                        {showTranslated && m.translatedContent ?
                            m.translatedContent : null}
                    </span>


                </div>
            ))}
        </ScrollableFeed>
    )
}

export default ScrollableChat
