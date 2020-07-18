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
const kontaktKeyboard = require('./keyboards/kontaktKeyboard.json');

function say(response, message) {
	response.send(new TextMessage(message,bttnPocetnaKeyboard));
}

const bot = new ViberBot({
	authToken: process.env.VIBER_PUBLIC_ACCOUNT_ACCESS_TOKEN_KEY,
	name: "Пријемни испит ФТН КМ",
	avatar: "./img/ftnkm-logo.png" // It is recommended to be 720x720, and no more than 100kb.
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

bot.onTextMessage(/kontakt/i, (message, response) =>
	response.send(new KeyboardMessage(kontaktKeyboard))
);

bot.onTextMessage(/prijavaK/i, (message, response) =>
	response.send(new TextMessage('Пријављивање кандидата: 01. и 02.09.2020. године у периоду од 08:00 до 14:00 часова', konkursniRokKeyboard))
);

bot.onTextMessage(/polaganjePI/i, (message, response) => [
	response.send(new TextMessage('Полагање пријемног испита из математике ће се одржати 03.09.2020. године у 10:00 часова', konkursniRokKeyboard)),
	response.send(new TextMessage('за Студијски програм – Архитектура полаже се и пријемни испит из Слободног цртања 03.09.2020 у 13:00 часова', konkursniRokKeyboard)),
]);

bot.onTextMessage(/skolarina/i, (message, response) => [
	response.send(new TextMessage('Школарина за самофинансирајуће студенте износи: 30.000 динара', glavniMeniKeyboard)),
	response.send(new TextMessage('Школарина за студенте стране држављане износи: 1.200 €', glavniMeniKeyboard)),
]);

bot.onTextMessage(/dokumenta/i, (message, response) => [
	response.send(new TextMessage('Приликом пријаве на увид се подносе ОРИГИНАЛНА ДОКУМЕНТА а уз пријавни лист (фотокопирница) предају фотокопије следећих докумената', glavniMeniKeyboard)),
	response.send(new TextMessage('1. сведочанства сва четри разреда завршене средње школе, 2. диплому о положеном завршном испиту, 3. доказ о уплати накнаде за полагање пријемног испита', glavniMeniKeyboard)),
	response.send(new TextMessage('жиро рачун: 840-1493666-45, прималац: ФТН КМ, износ: 3000 дин.', glavniMeniKeyboard)),
]);

bot.onTextMessage(/studentska/i, (message, response) => 
	response.send(new TextMessage('Уколико су Вам потребне додатне информације, контактирајте Службу за студентска питања ФТН-а на број телефона 028/425-321', kontaktKeyboard))
);

bot.onTextMessage(/webSajt/i, (message, response) => 
	response.send(new UrlMessage("http://www.ftn.pr.ac.rs", kontaktKeyboard))
);

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
	response.send(new TextMessage('Број слободних места на буџету је 5', slobodnaMestaKeyboard)),
	response.send(new TextMessage('Број слободних места на самофинансирању је 5', slobodnaMestaKeyboard)),
]);

bot.onTextMessage(/gi/i, (message, response) => [
	response.send(new TextMessage('Број слободних места на буџету је 14', slobodnaMestaKeyboard)),
	response.send(new TextMessage('Број слободних места на самофинансирању је 5', slobodnaMestaKeyboard)),
]);

bot.onTextMessage(/eiri/i, (message, response) => [
	response.send(new TextMessage('Број слободних места на буџету је 38', slobodnaMestaKeyboard)),
	response.send(new TextMessage('Број слободних места на самофинансирању је 20', slobodnaMestaKeyboard)),
]);

bot.onTextMessage(/mi/i, (message, response) => [
	response.send(new TextMessage('Број слободних места на буџету је 4', slobodnaMestaKeyboard)),
	response.send(new TextMessage('Број слободних места на самофинансирању је 30', slobodnaMestaKeyboard)),
]);

bot.onTextMessage(/izzsiznr/i, (message, response) => [
	response.send(new TextMessage('Број слободних места на буџету је 27', slobodnaMestaKeyboard)),
	response.send(new TextMessage('Број слободних места на самофинансирању је 7', slobodnaMestaKeyboard)),
]);

bot.onTextMessage(/ii/i, (message, response) => [
	response.send(new TextMessage('Број слободних места на буџету је 0', slobodnaMestaKeyboard)),
	response.send(new TextMessage('Број слободних места на самофинансирању је 10', slobodnaMestaKeyboard)),
]);

bot.onTextMessage(/ri/i, (message, response) => [
	response.send(new TextMessage('Број слободних места на буџету је 7', slobodnaMestaKeyboard)),
	response.send(new TextMessage('Број слободних места на самофинансирању је 8', slobodnaMestaKeyboard)),
]);

bot.onTextMessage(/ti/i, (message, response) => [
	response.send(new TextMessage('Број слободних места на буџету је 17', slobodnaMestaKeyboard)),
	response.send(new TextMessage('Број слободних места на самофинансирању је 5', slobodnaMestaKeyboard)),
]);

bot.onTextMessage(/./i, (message, response) => 
	response.send(new TextMessage("Појам који сте тражили није тренутно евидентиран у бази знања.", bttnPocetnaKeyboard))
);


const webhookUrl = process.env.WEBHOOK_URL;

const server = http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(process.env.WEBHOOK_URL));

