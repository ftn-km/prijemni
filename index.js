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
const konkursniRokKeyboard = require('./keyboards/konkursniRokKeyboard.json');
const slobodnaMestaKeyboard = require('./keyboards/slobodnaMestaKeyboard.json');
const afirmativniUpisKeyboard = require('./keyboards/afirmativniUpisKeyboard.json');

function say(response, message) {
	response.send(new TextMessage(message,bttnPocetnaKeyboard));
}

const bot = new ViberBot({
	authToken: process.env.VIBER_PUBLIC_ACCOUNT_ACCESS_TOKEN_KEY,
	name: "Пријемни испит ФТН КМ",
	avatar: "https://wpweb-prod.rtu.lv/energy/wp-content/uploads/sites/10/2014/09/FTS_LOGO.png" // It is recommended to be 720x720, and no more than 100kb.
});

//bot.on(BotEvents.CONVERSATION_STARTED, (userProfile, isSubscribed, context, onFinish) => response.send(new KeyboardMessage(pocetnaKeyboard)) );

bot.onConversationStarted((userProfile, isSubscribed, context, onFinish) => {
	onFinish(new TextMessage('Здраво! Ја сам ФТН-ов chat бот за пријемни испит!',nastaviKeyboard));
});

/*
bot.onSubscribe(response => {
  say(response, 'Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me if a web site is down for everyone or just you. Just send me a name of a website and I'll do the rest!');
});
*/
bot.onTextMessage(/glavniMeni/i, (message, response) =>
	response.send(new KeyboardMessage(glavniMeniKeyboard))
);

bot.onTextMessage(/konkursniRok/i, (message, response) =>
	response.send(new KeyboardMessage(konkursniRokKeyboard))
);

bot.onTextMessage(/slobodnaMesta/i, (message, response) =>
	response.send(new KeyboardMessage(slobodnaMestaKeyboard))
);

bot.onTextMessage(/afirmativniUpis/i, (message, response) =>
	response.send(new KeyboardMessage(afirmativniUpisKeyboard))
);

bot.onTextMessage(/prijavaK/i, (message, response) =>
	response.send(new TextMessage('Пријављивање кандидата: 01. и 02.09.2020. године', konkursniRokKeyboard))
);

bot.onTextMessage(/polaganjePI/i, (message, response) =>
	response.send(new TextMessage('Полагање пријемних испита: 03. и 04.09.2020. године', konkursniRokKeyboard))
);

bot.onTextMessage(/skolarina/i, (message, response) => [
	response.send(new TextMessage('Школарина за студенте стране држављане износи: 1.200 €', glavniMeniKeyboard)),
	response.send(new TextMessage('Школарина за самофинансирајуће студенте износи: 30.000 динара', glavniMeniKeyboard)),
]);

bot.onTextMessage(/predmeti/i, (message, response) => [
	response.send(new TextMessage('за Студијски програм – Архитектура полаже се пријемни испит из Математике (општи део и геометрија) и Слободног цртања', glavniMeniKeyboard)),
	response.send(new TextMessage('Пријављени кандидати полажу пријемни испит из Математике', glavniMeniKeyboard)),
]);

bot.onTextMessage(/saInvaliditetom/i, (message, response) =>
	response.send(new TextMessage('2 слободна места', afirmativniUpisKeyboard))
);

bot.onTextMessage(/pripadnikRN/i, (message, response) =>
	response.send(new TextMessage('2 слободна места', afirmativniUpisKeyboard))
);

bot.onTextMessage(/straniDrzavljani/i, (message, response) =>
	response.send(new TextMessage('2 слободна места', afirmativniUpisKeyboard))
);

bot.onTextMessage(/arhitektura/i, (message, response) => [
	response.send(new TextMessage('Број слободних места на самофинансирању је 5', slobodnaMestaKeyboard)),
	response.send(new TextMessage('Број слободних места на буџету је 5', slobodnaMestaKeyboard)),
]);

bot.onTextMessage(/gi/i, (message, response) => [
	response.send(new TextMessage('Број слободних места на самофинансирању је 5', slobodnaMestaKeyboard)),
	response.send(new TextMessage('Број слободних места на буџету је 14', slobodnaMestaKeyboard)),
]);

bot.onTextMessage(/eiri/i, (message, response) => [
	response.send(new TextMessage('Број слободних места на самофинансирању је 20', slobodnaMestaKeyboard)),
	response.send(new TextMessage('Број слободних места на буџету је 38', slobodnaMestaKeyboard)),
]);

bot.onTextMessage(/mi/i, (message, response) => [
	response.send(new TextMessage('Број слободних места на самофинансирању је 30', slobodnaMestaKeyboard)),
	response.send(new TextMessage('Број слободних места на буџету је 4', slobodnaMestaKeyboard)),
]);

bot.onTextMessage(/izzsiznr/i, (message, response) => [
	response.send(new TextMessage('Број слободних места на самофинансирању је 7', slobodnaMestaKeyboard)),
	response.send(new TextMessage('Број слободних места на буџету је 27', slobodnaMestaKeyboard)),
]);

bot.onTextMessage(/ii/i, (message, response) => [
	response.send(new TextMessage('Број слободних места на самофинансирању је 10', slobodnaMestaKeyboard)),
	response.send(new TextMessage('Број слободних места на буџету је 0', slobodnaMestaKeyboard)),
]);

bot.onTextMessage(/ri/i, (message, response) => [
	response.send(new TextMessage('Број слободних места на самофинансирању је 8', slobodnaMestaKeyboard)),
	response.send(new TextMessage('Број слободних места на буџету је 7', slobodnaMestaKeyboard)),
]);

bot.onTextMessage(/ti/i, (message, response) => [
	response.send(new TextMessage('Број слободних места на самофинансирању је 5', slobodnaMestaKeyboard)),
	response.send(new TextMessage('Број слободних места на буџету је 17', slobodnaMestaKeyboard)),
]);

bot.onTextMessage(/./i, (message, response) => 
	response.send(new TextMessage("Појам који сте тражили није тренутно евидентиран у бази знања.", bttnPocetnaKeyboard))
);


const webhookUrl = process.env.WEBHOOK_URL;

const server = http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(process.env.WEBHOOK_URL));

