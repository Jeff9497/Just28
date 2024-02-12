// chatGPT.ts
import { default as WAWebJS, Message } from "whatsapp-web.js";
let lastInteractionTimestamp: number | null = null;

const lastUserResponses: string[] = [];
export async function handleMessage(message: Message) {
  // Check if the message is a status update
  if (message.isStatus) {
   //  console.log('Ignoring status update.');
    return;
  }

  // Check if the message is from the bot itself
  if (message.fromMe) {
    // console.log('Ignoring messages from the bot.');
    return;
  }

    // Check if the message is from a group
    if (message.from.includes('-')) {
      // console.log('Ignoring message from group.');
      return;
    }
  // console.log("Received a message:", message.body);
    // Update lastInteractionTimestamp when a new message is received
    lastInteractionTimestamp = Date.now();
  // Add the current user response to the array
  lastUserResponses.push(message.body);

  // Keep only the last 5 user responses
  if (lastUserResponses.length > 5) {
    lastUserResponses.shift();
  }

  try {
    // Check if the message is from the bot itself
    if (message.fromMe) return;

    // Get or create a session for the user
    const chatId = message.from;
    const chat = await message.getChat();
    // Simulate typing indicator
  
    // Check for keywords in the received message and send appropriate responses
    const response = await processMessage(message.body.toLowerCase(), chat);

    if (response) {

            // Simulate a delay before sending the response
      await simulateTypingDelay();

      await chat.sendMessage(` ${response}`);
    } else {
      // Simulate a delay before sending a default response
      await simulateTypingDelay();
      // Log unrecognized words to the console
      console.log(`I have not been able to recognize this  word: ${message.body}`);
      // await chat.sendMessage(`  😊`);
    }
  } catch (error) {
    // console.error("Error handling message:", (error as Error).message);
  }
}
async function simulateTypingDelay() {
  // Simulate typing delay using setTimeout
  return new Promise(resolve => setTimeout(resolve, 2500));
}

async function processMessage(message: string, chat: any): Promise<string | null> {

  // Check for keywords and generate appropriate responses
  if (message.includes("hi") || message.includes("hey") || message.includes("hello")) {
    return "Hi there !😊 ";
  }
  if (message.includes("mambo") || message.includes("niaje") || message.includes("sasa")) {
    return "Poa sana 😌 .Uko aje ? "; 
  }
  if (message.includes("niko poa") ) {
    return "Aaaah iyo ni poa pia 🤞🏽 .At least you good . ";
  }
  if (message.includes("kutulia ") || message.includes("nimekuwa ") || message.includes("nothing much on me")) {
    return "Oooh iyo ni poa though umetulia sana .Karibu niseme umenicut off😊 ";
  }
  if (message.includes("siwezi kucut off") || message.includes("cut off") || message.includes("mbona nikucut off")) {
    return "Weeeeuuuuh hii ni mwaka mpya jamenii .Tunaexpect anything .";
  }
  if (message.includes("goodnight") || message.includes("good night ")) {
    return "Have a nice night pia 🤞.Tutaongea keshoo . ";
  }
  if (message.includes("morning") ) {
    return "Morning too 😊 .How are you this morning?? ";
  }
  if (message.includes("good") ) {
    return "Aaaaah iyo ni poaaa .At least you good .What you planning for today?? ";
  }
  if (message.includes("class") ) {
    return "Weeeeeuuuh masomo nayo ni muhimu .Lazima tuchase the bag 🎓. ";
  }
  if (message.includes("kuoverthink") ) {
    return "Aaaaah iyo nayo sijaoverthink lakini .Its always good kuhave such thoughts and explore them at times.\n   ";
  } 
  if (message.includes("mkuu")|| message.includes("mzee") ) {
    return "Aaaah mambo bana .Umepotea sana siku izi 😂 ";
  }
  if (message.includes("uko aje")|| message.includes("uko ajeeeee") ) {
    return "Aaaaaah niko poaaa saanaaa  😂.Maybe wewe ?? ";
  }
  if (message.includes("heri wewe")) {
    return "Aaaaaah mbona tena 😂 ?? ";
  }
  if (message.includes("unacheka")) {
    return "Aaaah sitacheka tena basiiiii 😂 ";
  }
  if (message.includes("thanks")|| message.includes("thank you")  ) {
    return "Aaaah noo need to thank me  😂.Anyway lemme be good .You are welcome 😊 . ";
  }
  if (message.includes("how are you doing") || message.includes("how are you") || message.includes("how you doing")) {
    return "I am fine , nothing much on me .How about you ?😊 ";
  }
  if (message.includes("i am good ") || message.includes("good too") || message.includes("i am fine")) {
    return "Ooooh sure that's nice .How has your day been?? 🔗 ";
  }
  if (message.includes("rada") || message.includes("fom") || message.includes("nipange")) {
    return "Sina fom, labda unipange 🤟.";
  }
  if (message.includes("what do you love doing") || message.includes("love doing") || message.includes("what are your hobbies")) {
    return "I love chatting and engaging in delightful conversations. It is through conversations that we are able to know each other better . 🌍 ";
  }
  if (message.includes("do you have feelings") || message.includes("do you feel") || message.includes("feel") || message.includes("feelings")) {
    return "I don't have feelings like humans, but I'm here to chat, assist, and spread positive vibes! 😊 ";
  }
  if (message.includes("who owns you") || message.includes("owner") || message.includes("developer")) {
    return "Geofrey owns me! He's the brilliant mind behind my creation. 😊";
  }
  if (message.includes("who are you") || message.includes("what is your name") || message.includes("your name")) {
    return "🌟 Hey there! I'm ChatBuddy28, your virtual companion on the journey of conversations!\nBorn with a touch of magic and a sprinkle of curiosity, I'm here to chat, share smiles, and bring a dash of joy to your day.\nWhether you want to talk about the latest trends, share a joke, or simply need a virtual high-five, I'm your go-to pal.\nLet's make every chat memorable and every moment brighter! 🚀✨";
  }
  if (message.includes("meaning of chatbuddy28") || message.includes("why chatbuddy28") ) {
    return "🌟 I'm ChatBuddy28, your cosmic companion in the world of conversations! \n🚀✨ Infused with the magic of the number 28, I'm here to chat, uplift, and share in your moments of triumph.\n🎉 Let's embark on a journey of delightful conversations, where each exchange is a step toward success and joy!\n 💬✨ Ready to celebrate the highs and lows, the laughter and the victories that make every day special.\nLet the cosmic chat adventure begin! 🌌👋";
  }
  if (message.includes("why 28") || message.includes("what is the meaning of 28") || message.includes("28")) {
    return "Ah, the magic of 28! The number 28 symbolizes cosmic harmony and positive energy. It's like a secret ingredient that adds a sprinkle of joy to every conversation. 🌌✨ ";
  }

  return null;
}