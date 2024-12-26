require('dotenv').config()
const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const TelegramBot = require('node-telegram-bot-api')

const token = process.env.TELEGRAM_BOT_TOKEN
const SERVER_URL = process.env.SERVER_URL
const bot = new TelegramBot(token, { polling: true })
const app = express()
const { url } = require('url')

// Настройка middleware для обработки JSON
app.use(bodyParser.json())

// Обработка всех текстовых сообщений
bot.on('message', async msg => {
	const chatId = msg.chat.id
	const userId = msg.from.id // Получаем ID пользователя
	const userName = msg.from.username || '' // Получаем username, если он есть

	// Создаем объект для отправки на сервер
	const userData = {
		telegramId: userId,
		userName: userName,
	}

	// Попробуем получить информацию о пользователе
	try {
		await axios.post(`${SERVER_URL}/api/user`, userData)
		sendMessageWithWebAppButton(chatId, userId) // Отправляем сообщение с кнопкой после успешного запроса
	} catch (error) {
		console.error('Ошибка:', error)
		bot.sendMessage(
			chatId,
			'Произошла ошибка при получении или регистрации пользователя. Убедитесь, что ваш профиль доступен для пользователей не из вашего списка контактов.'
		)
	}
})

function sendMessageWithWebAppButton(chatId, userId) {
	const options = {
		reply_markup: {
			inline_keyboard: [
				[
					{
						text: 'Открыть приложение',
						web_app: { url: `${SERVER_URL}/?telegramId=${userId}` },
					},
				],
			],
		},
	}

	bot.sendMessage(
		chatId,
		'Нажмите кнопку для открытия веб-приложения:',
		options
	)
}

// Логирование ошибок
bot.on('polling_error', error => {
	console.log(error) // Вывод ошибок в консоль
})

// Запускаем сервер
const PORT = process.env.APP_PORT || 5000
app.listen(PORT, () => {
	console.log(`Сервер бота запущен на порту ${PORT}`)
})
