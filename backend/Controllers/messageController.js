import Message from "../models/MessageModel.js";
import User from '../models/UserModel.js';
import Chat from "../models/chatModels.js";
import axios from 'axios';

export const sendMessage = async(req,res) => {
    const {content,chatId} = req.body;

    if(!content || !chatId){
        return res.status(400).json({message:"Invalid Data passed into the request"})
    }

    var newMessage = {
        sender:req.user._id,
        content:content,
        chat: chatId,
    }
    try{
        var message = await Message.create(newMessage);
        message = await message.populate("sender","name pic");
        message = await message.populate("chat");
        message = await User.populate(message,
            {
                path:"chat.users",
                select:"name pic email"
            }
            );
        
        await Chat.findByIdAndUpdate(req.body.chatId,{latestMessage:message});
        
        res.status(201).json(message);

    }catch(error){
        res.status(400).json({message:error.message})
    }
}


export const allMessages = async(req,res) => {
    try {
        const messages = await Message.find({chat:req.params.chatId}).populate(
            "sender","name pic email"
            )
        .populate("chat");

        // console.log(messages)
        // Translate each message to the current user's preferred language
        const currentUser = await User.findById(req.user._id);
        console.log('Current user:', currentUser)
        for (let message of messages) {
            const encodedParams = new URLSearchParams();
            encodedParams.set('texte', message.content);
            encodedParams.set('to_lang', currentUser.preferredLanguage);

            const options = {
                method: 'POST',
                url: 'https://free-google-translation.p.rapidapi.com/translate',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': process.env.TRANSLATE_API_KEY,
                    'X-RapidAPI-Host': 'free-google-translation.p.rapidapi.com'
                },
                data: encodedParams,
            };
            
            try {
                const response = await axios.request(options);
                message.translatedContent = response.data.translation_data.translation;
                console.log(response)
                console.log('Original content:', message.content);
                console.log('Translated content:', message.translatedContent);

            } catch (error) {
                console.error("Translation failed for message id: ", message._id , error.message);
            }
        }
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json({message:error.message})
    }   
}