// index.ts
import { Client } from "whatsapp-web.js";
import { default as qrcode } from "qrcode-terminal";
import { ChatGPTAPI } from "chatgpt";
import { config } from "dotenv";
import { handleMessage } from "./chatGPT.js";
config();
export const api = new ChatGPTAPI({
    apiKey: process.env.CHAT_GPT_API_KEY,
});
const client = new Client({});
let isConnected = false;
client.on("qr", (qr) => {
    console.log("QR Code generated. Scan it with your phone.");
    qrcode.generate(qr, { small: true });
});
client.on("ready", () => {
    console.log("Client is ready! Bot has been successfully connected to WhatsApp!");
    isConnected = true;
});
client.on("authenticated", () => {
    console.log("WhatsApp account authenticated!");
});
client.on("auth_failure", (err) => {
    console.error("Authentication failed:", err);
});
client.on("message_create", async (msg) => {
    // Check if the message is from a group
    const chat = await msg.getChat();
    if (chat.isGroup) {
        // Ignore group messages and return
        return;
    }
    // Check if the message is not from the bot
    if (!msg.fromMe && msg.from !== undefined && msg.from !== null) {
        // Process the message without logging it
        try {
            await handleMessage(msg);
        }
        catch (e) {
            console.error("Error handling message:", e.message);
            msg.reply("An error occurred. Please try again later.");
        }
    }
});
client.initialize();
// Check for connection status periodically
setInterval(() => {
    if (!isConnected) {
        console.log("Bot is not yet connected. Keep scanning the QR code.");
    }
}, 60000); // Check every 60 seconds
