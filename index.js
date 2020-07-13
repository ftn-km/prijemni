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
const konkursniRokDatumKeyboard = require('./keyboards/konkursniRokDatumKeyboard.json');



function say(response, message) {
  response.send(new TextMessage(message,bttnPocetnaKeyboard));
}

const bot = new ViberBot({

  authToken: process.env.VIBER_PUBLIC_ACCOUNT_ACCESS_TOKEN_KEY,
  name: "ftnkmprijemni",
  avatar: "https://raw.githubusercontent.com/paundo/viber-bot/master/pravopis.png" // It is recommended to be 720x720, and no more than 100kb.
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
bot.onTextMessage(/konkursniRokDatum/i, (message, response) =>
  response.send(new KeyboardMessage(konkursniRokDatumKeyboard)));

bot.onTextMessage(/konkursniRok/i, (message, response) =>
  response.send(new TextMessage(`Тренутно је активан други конкурсни рок за упис у школску 2020/2021. годину`,konkursniRokDatumKeyboard)));

bot.onTextMessage(/datum/i, (message, response) =>
  response.send("Датуми за полагање су..."));

bot.onTextMessage(/./i, (message, response) => 
  response.send(new TextMessage("Појам који сте тражили није тренутно евидентиран у бази знања.",bttnPocetnaKeyboard)));


const webhookUrl = process.env.WEBHOOK_URL;

const server = http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(process.env.WEBHOOK_URL));

