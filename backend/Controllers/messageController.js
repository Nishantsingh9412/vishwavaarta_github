import Message from "../models/MessageModel.js";
import User from '../models/UserModel.js';
import Chat from "../models/chatModels.js";

import axios from 'axios';

export const sendMessage = async(req,res) => {
    const {content, chatId} = req.body;

    if(!content || !chatId){
        return res.status(400).json({message:"Invalid Data passed into the request"})
    }

    // Translate the message content
    const encodedParams = new URLSearchParams();
    encodedParams.set('texte', content);
    encodedParams.set('to_lang', 'fr');

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

    let translatedContent;
    try {
        const response = await axios.request(options);
        translatedContent = response.data.translation_data.translation;
    } catch (error) {
        return res.status(500).json({message: "Translation failed"});
    }

    var newMessage = {
        sender:req.user._id,
        content: translatedContent, // Use the translated content
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


// export const sendMessage = async(req,res) => {
//     const {content,chatId} = req.body;

//     if(!content || !chatId){
//         return res.status(400).json({message:"Invalid Data passed into the request"})
//     }

//     var newMessage = {
//         sender:req.user._id,
//         content:content,
//         chat: chatId,
//     }
//     try{
//         var message = await Message.create(newMessage);
//         message = await message.populate("sender","name pic");
//         message = await message.populate("chat");
//         message = await User.populate(message,
//             {
//                 path:"chat.users",
//                 select:"name pic email"
//             }
//             );
        
//         await Chat.findByIdAndUpdate(req.body.chatId,{latestMessage:message});
        
//         res.status(201).json(message);

//     }catch(error){
//         res.status(400).json({message:error.message})
//     }
// }

export const allMessages = async(req,res) => {
    try {
        const messages = await Message.find({chat:req.params.chatId}).populate(
            "sender","name pic email"
            )
        .populate("chat");
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json({message:error.message})
    }   
}



// import Message from "../models/MessageModel.js";
// import User from '../models/UserModel.js';
// import Chat from "../models/chatModels.js";
// import {Translate} from '@google-cloud/translate';

// // Creates a client
// const translate = new Translate();

// async function translateText(text, targetLanguage) {
//   let [translations] = await translate.translate(text, targetLanguage);
//   translations = Array.isArray(translations) ? translations : [translations];
//   return translations[0];
// }

// export const sendMessage = async(req,res) => {
//     const {content,chatId} = req.body;

//     if(!content || !chatId){
//         return res.status(400).json({message:"Invalid Data passed into the request"})
//     }

//     var newMessage = {
//         sender:req.user._id,
//         content:content,
//         chat: chatId,
//     }
//     try{
//         // Translate the message content
//         const userLanguage = req.user.language; // Retrieve the user's language preference from the request
//         newMessage.content = await translateText(newMessage.content, userLanguage);

//         var message = await Message.create(newMessage);
//         message = await message.populate("sender","name pic");
//         message = await message.populate("chat");
//         message = await User.populate(message,
//             {
//                 path:"chat.users",
//                 select:"name pic email"
//             }
//             );
        
//         await Chat.findByIdAndUpdate(req.body.chatId,{latestMessage:message});
        
//         res.status(201).json(message);

//     }catch(error){
//         res.status(400).json({message:error.message})
//     }
// }

// export const allMessages = async(req,res) => {
//     try {
//         const messages = await Message.find({chat:req.params.chatId}).populate(
//             "sender","name pic email"
//             )
//         .populate("chat");
//         res.status(200).json(messages)
//     } catch (error) {
//         res.status(400).json({message:error.message})
//     }   
// }



// import Message from "../models/MessageModel.js";
// import User from '../models/UserModel.js';
// import Chat from "../models/chatModels.js";
// import axios from 'axios';

// async function translateText(text, targetLanguage) {
//   try {
//     const response = await axios.post('https://libretranslate.com/translate', {
//       q: text,
//       source: 'en',
//       target: 'hi',
//     });
//     return response.data.translatedText;
//   } catch (error) {
//     console.error(error);
//     // Handle the error
//   }
// }

// export const sendMessage = async(req,res) => {
//     const {content,chatId} = req.body;

//     if(!content || !chatId){
//         return res.status(400).json({message:"Invalid Data passed into the request"})
//     }

//     var newMessage = {
//         sender:req.user._id,
//         content:content,
//         chat: chatId,
//     }
//     try{
//         // Translate the message content
//         const userLanguage = req.user.language; // Retrieve the user's language preference from the request
//         newMessage.content = await translateText(newMessage.content, userLanguage);

//         var message = await Message.create(newMessage);
//         message = await message.populate("sender","name pic");
//         message = await message.populate("chat");
//         message = await User.populate(message,
//             {
//                 path:"chat.users",
//                 select:"name pic email"
//             }
//             );
        
//         await Chat.findByIdAndUpdate(req.body.chatId,{latestMessage:message});
        
//         res.status(201).json(message);

//     }catch(error){
//         res.status(400).json({message:error.message})
//     }
// }

// export const allMessages = async(req,res) => {
//     try {
//         const messages = await Message.find({chat:req.params.chatId}).populate(
//             "sender","name pic email"
//             )
//         .populate("chat");
//         res.status(200).json(messages)
//     } catch (error) {
//         res.status(400).json({message:error.message})
//     }   
// }