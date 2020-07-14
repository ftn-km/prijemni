const http = require('http');

const https = require('https');
const port = process.env.PORT || 8080;
const BotEvents = require('viber-bot').Events;

const ViberBot = require('viber-bot').Bot;
const TextMessage = require('viber-bot').Message.Text;

const KeyboardMessage = require('viber-bot').Message.Keyboard;
const PictureMessage = require('viber-bot').Message.Picture;
const UrlMessage = require('viber-bot').Message.Url;
const request = require('request');

const nastaviKeyboard = require('./keyboards/nastaviKeyboard.json');
const glavniMeniKeyboard = require('./keyboards/glavniMeniKeyboard.json');


function say(response, message) {
  response.send(new TextMessage(message,bttnPocetnaKeyboard));
}

const bot = new ViberBot({

  authToken: process.env.VIBER_PUBLIC_ACCOUNT_ACCESS_TOKEN_KEY,
  name: "Пријемни испит ФТН КМ",
  avatar: "https://wpweb-prod.rtu.lv/energy/wp-content/uploads/sites/10/2014/09/FTS_LOGO.png" // It is recommended to be 720x720, and no more than 100kb.
});

//bot.on(BotEvents.CONVERSATION_STARTED, (userProfile, isSubscribed, context, onFinish) => response.send(new KeyboardMessage(pocetnaKeyboard)) );

bot.onConversationStarted((userProfile, isSubscribed, context, onFinish) =>{
  onFinish(new TextMessage(`Здраво! Ја сам ФТН-ов chat бот за пријемни испит!`,nastaviKeyboard));
});

/*
bot.onSubscribe(response => {
  say(response, `Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me if a web site is down for everyone or just you. Just send me a name of a website and I'll do the rest!`);
});
*/
bot.onTextMessage(/glavniMeni/i, (message, response) =>
  response.send(new KeyboardMessage(glavniMeniKeyboard)));

bot.onTextMessage(/konkursniRok/i, (message, response) =>
  response.send(new TextMessage('',konkursniRokKeyboard)));

bot.onTextMessage(/prijavaK/i, (message, response) =>
  response.send(new TextMessage(`Пријављивање кандидата: 01. и 02.09.2020. године`,konkursniRokKeyboard)));

bot.onTextMessage(/polaganjePI/i, (message, response) =>
  response.send(new TextMessage(`Полагање пријемних испита: 03. и 04.09.2020. године`,konkursniRokKeyboard)));

bot.onTextMessage(/datum/i, (message, response) =>
  response.send(new TextMessage(`Датуми за полагање пријемног испита у другом конкурсном року су: `,glavniMeniKeyboard)));

bot.onTextMessage(/./i, (message, response) => 
  response.send(new TextMessage("Појам који сте тражили није тренутно евидентиран у бази знања.",bttnPocetnaKeyboard)));


const webhookUrl = process.env.WEBHOOK_URL;

const server = http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(process.env.WEBHOOK_URL));

