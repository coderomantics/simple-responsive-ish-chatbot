//timestamp
function getTime() {
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let day = today.getDate();
  let month = today.toLocaleString("default", {month: "short"});
  
  if(hours < 10) {
    hours = '0' + hours;
  }
  
  if(minutes < 10) {
    minutes = '0' + minutes;
  }
  
  let sentTime = `${hours}:${minutes}, ${day} ${month}`;
  return sentTime;
  
}

//sending out texts
function sendText() {
  let userText = $(".type-message").val();
  
  if (userText === "") {
    return false;
  } else {
  
  let userHTML = 
    `<div class="user-container">
    <div class="user-text"><span>${userText}  </span></div>
    <div class="user-timestamp"></div></div>`;
  
  $(".message-list").append(userHTML);
  $(".user-timestamp:last").append(getTime());
  $(".type-message").val(""); 
  }
  setTimeout(function() {
    getReply(userText);
  },1000);
}

//send button
$('.send-button').click(function(event){ sendText();
});
$('.type-message').on('keydown',function(event) {
    if(event.which === 13) {sendText(); 
  }
})

//convo
const userMsg = [
  ["hi", "hey", "hello", "good morning", "good afternoon"],
  [
    "how are you",
    "how are you doing",
    "how you doing",
    "how u doin",
    "hows it going",
    "how's it going",
    "how is it going",
  ],
  [
    "what's up",
    "wys",
    "what you saying",
    "what u sayin",
    "what you sayin"
  ],
  ["what is your name", "what's your name", "whats your name"],
  ["where are you from", "where u from", "where r u from"],
  ["yes", "ok", "okay", "cool", "nice", "great", "lovely"],
  ["tell me something"],
  ["thank you", "thank u", "ty", "thanks"],
  ["im fine", "im good", "im ok", "im okay"],
  ["bye", "good bye", "goodbye", "bye bye", "see you later", "see u later"]
];

const botReply = [
  ["hello", "hi", "hey", "hi there"],
  ["I'm fine. How are you?", "I'm good. How are you?"],
  [
    "Nothing much",
    "I'm coding",
  ],
  ["I don't know my name", "I don't have a name"],
  ["I'm from the Internet", "I'm from London"],
  ["yes", "ok", "okay", "cool", "nice", "great", "lovely"],
  ["You are cool", "You are cute", "I love talking to you"],
  ["Are you okay?"],
  ["I need to go", "I'm logging off"],
  ["bye", "good bye", "goodbye", "bye bye", "see you later", "see u later"]
];

const altReply = [
  "I don't understand",
  "Please say something else",
  "Please rephrase what you just said"
];

function output(input) {
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  
  text = text
    .replace(/whats/g, "what is")
    .replace(/r u/g, "are you");
  
  if (compare(userMsg, botReply, text)) {
    finalReply = compare(userMsg, botReply, text);
  } else { 
    finalReply = altReply[Math.floor(Math.random() * altReply.length)];
  }
  return finalReply;
}

function compare(userMsg, botReply, text) {
  for (let i=0; i<userMsg.length; i++) {
    for (let j=0; j<botReply.length; j++) {
     if (userMsg[i][j] == text) {
       return botReply[i][Math.floor(Math.random()* botReply[i].length)];
     }
    }
  }
}
//reference: https://dev.to/sylviapap/make-a-simple-chatbot-with-javascript-1gc

//generating bot replies
function getReply(userText) {
  let getBotReply = output(userText);
  let botHTML= `<div class="bot-container"><div class="bot-text"><span>${getBotReply}</span></div>
  <div class="bot-timestamp"></div></div>`;
  $(".message-list").append(botHTML);
  $(".bot-timestamp:last").append(getTime());
}




