require('dotenv').config();

const openWeatherMap = require('./api/openWeatherMap');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const TelegramBot = require('node-telegram-bot-api');

const telegramApiToken = process.env.TELEGRAM_API_TOKEN;
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/naffiqTestBot';

const bot = new TelegramBot(telegramApiToken, {polling: true});

MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;

        console.log(chatId);
    });

    bot.onText(/\/start/, (msg, match) => {
        console.log('start');
        bot.sendMessage(
            msg.chat.id, 
            'Привет! Этот бот поможет тебе узнать последние новости о фестивале RedJolbors 2017. Выберите команду, чтобы продолжить.',
            {
                reply_to_message_id: msg.message_id,
                reply_markup: JSON.stringify({
                    keyboard: [
                        ['Новости'],
                        ['Места проведения'],
                        ['Контакты организаторов'],
                        ['Погода Бишкека']
                    ]
                })
            }
        );
    });

    bot.onText(/Контакты организаторов/, (msg, match) => {
        bot.sendMessage(msg.chat.id, 'Галымжан:\nabdu.galymzhan@gmail.com');
    });

    bot.onText(/Места проведения/, (msg, match) => {
        bot.sendMessage(msg.chat.id, 'Ракетная фирма:\nул. Луганского 1/1, кв 169', {
            entities: JSON.stringify([{type: 'bold', offset: 0, length: 15}])
        });
    });

    bot.onText(/Погода Бишкека/, (msg, match) => {
        const weatherData = openWeatherMap(1528334); // ID of Bishkek City
        bot.sendMessage(msg.chat.id, 'Жду ответа всевышнего...');

        weatherData.then((response) => {
            bot.sendMessage(msg.chat.id, 'Погода на сегодня:\n' + response);
        });
    });

    db.close();
});