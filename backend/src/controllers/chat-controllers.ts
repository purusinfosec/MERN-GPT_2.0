// src/controllers/chat-controllers.ts
import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import openai from "../config/openai-config.js"; // ✅ import default export
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { messages } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    }

    // ✅ prepare chat history
    const chats = user.chats.map(
      ({ role, content }) => ({ role, content })
    ) as ChatCompletionMessageParam[];

    chats.push({ role: "user", content: messages });
    user.chats.push({ role: "user", content: messages });

    // ✅ call OpenAI
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: chats,
    });

    const assistantMessage = chatResponse.choices[0].message.content || "";

    // ✅ store assistant reply
    user.chats.push({ role: "assistant", content: assistantMessage });

    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
        
        req: Request, 
        res: Response, 
        next: NextFunction) => {
        try {
            // user check token
        
        const user = await User.findById( res.locals.jwtData.id );
        if (!user) { 
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
          console.log(user._id.toString(), res.locals.jwtData.id);

        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission denied" );
        }
        

        

         return res.status(200).json({ message: "OK", chats: user.chats });
        } catch (error) {
            console.error(error);
            return res.status(200).json({ message: "Internal Server Error", cause: error.message });
        }
    };

export const deleteChats = async (
        
        req: Request, 
        res: Response, 
        next: NextFunction) => {
        try {
            // user check token
        
        const user = await User.findById( res.locals.jwtData.id );
        if (!user) { 
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
          console.log(user._id.toString(), res.locals.jwtData.id);

        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission denied" );
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
         return res.status(200).json({ message: "OK" });

        } catch (error) {
            console.error(error);
            return res.status(200).json({ message: "Internal Server Error", cause: error.message });
        }
    };