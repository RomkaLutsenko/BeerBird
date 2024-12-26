const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const { PrismaClient } = require('@prisma/client')
const { now } = require('sequelize/lib/utils')

const app = express()
const PORT = process.env.APP_PORT || 3000
const prisma = new PrismaClient()

app.use(cors())
app.use(bodyParser.json())

// Утилита для сериализации объекта (для BigInt и DateTime)
const serializeBigInt = obj => {
	if (Array.isArray(obj)) {
		return obj.map(serializeBigInt)
	} else if (obj !== null && typeof obj === 'object') {
		return Object.entries(obj).reduce((acc, [key, value]) => {
			if (value instanceof Date) {
				// Если значение является объектом Date, конвертируем его в строку
				acc[key] = value.toISOString()
			} else if (typeof value === 'bigint') {
				// Если значение является bigint, конвертируем его в строку
				acc[key] = value.toString()
			} else {
				acc[key] = serializeBigInt(value) // Рекурсивный вызов для вложенных объектов
			}
			return acc
		}, {})
	}
	return obj // Возвращаем исходное значение для примитивов
}

// Эндпоинт, чтобы получить данные пользователя
app.post('/api/user', async (req, res) => {
	const { telegramId, userName } = req.body

	try {
		// Проверяем наличие пользователя в базе данных
		const user = await prisma.user.findUnique({
			where: { telegramId },
		})
		if (user) {
			// Проверяем, изменился ли userName
			if (user.userName !== userName) {
				// Обновляем userName, если он изменился
				const updatedUser = await prisma.user.update({
					where: { telegramId },
					data: { userName: userName }, // Обновляем только userName
				});
				return res.json(serializeBigInt(updatedUser)); // Возвращаем обновленные данные пользователя
			}
			return res.json(serializeBigInt(user)); // Возвращаем данные пользователя без изменений
		} else {
			// Создаем нового пользователя, если его нет
			const newUser = await prisma.user.create({
				data: {
					telegramId: telegramId,
					userName: userName,
				},
			})
			return res.json(serializeBigInt(newUser))
		}
	} catch (error) {
		console.error(error)
		return res.status(500).send('Server error')
	}
})

// Эндпоинт, чтобы увеличить счетчики при нажатии
app.post('/api/click', async (req, res) => {
	const { telegramId } = req.body

	try {
		// Обновляем количество очков (nowScore и totalScore)
		const user = await prisma.user.findUnique({
			where: { telegramId },
		})

		// Если пользователь не найден, создаем его с начальными значениями
		if (!user) {
			const newUser = await prisma.user.create({
				data: {
					telegramId: telegramId,
				},
			})
			return res.json(serializeBigInt(newUser))
		}

		// Используем clickBoost для вычисления увеличения счётчиков
		const clickBoost = user.clickBoost || 1

		// Обновляем значения nowScore и totalScore с учетом бонусов
		const updatedUser = await prisma.user.update({
			where: { telegramId },
			data: {
				nowScore: { increment: clickBoost },
				totalScore: { increment: clickBoost },
				lastActivity: new Date(),
			},
		})

		return res.json(serializeBigInt(updatedUser))
	} catch (error) {
		console.error(error)
		return res.status(500).send('Server error')
	}
})

// Эндпоинт, чтобы увеличить счетчики каждую секунду
app.post('/api/tick', async (req, res) => {
	const { telegramId } = req.body

	try {
		// Обновляем количество очков (nowScore и totalScore)
		const user = await prisma.user.findUnique({
			where: { telegramId },
		})

		// Если пользователь не найден, создаем его с начальными значениями
		if (!user) {
			const newUser = await prisma.user.create({
				data: {
					telegramId: telegramId,
				},
			})
			return res.json(serializeBigInt(newUser))
		}

		// Используем timeBoost для вычисления увеличения счётчиков
		const timeBoost = user.timeBoost || 0
		if (timeBoost == 0) {
			return res.json(serializeBigInt(user))
		}
		// Обновляем значения nowScore и totalScore с учетом бонусов
		const updatedUser = await prisma.user.update({
			where: { telegramId },
			data: {
				nowScore: { increment: timeBoost },
				totalScore: { increment: timeBoost },
				lastActivity: new Date(),
			},
		})

		return res.json(serializeBigInt(updatedUser))
	} catch (error) {
		console.error(error)
		return res.status(500).send('Server error')
	}
})

// Эндпоинт, чтобы обновить бустеры
app.post('/api/boost', async (req, res) => {
	const { telegramId, clickBoost, timeBoost, nowScore, boostItems } = req.body

	try {
		// Обновляем бустеры
		const user = await prisma.user.findUnique({
			where: { telegramId },
		})

		// Если пользователь не найден, создаем его с начальными значениями
		if (!user) {
			const newUser = await prisma.user.create({
				data: {
					telegramId: telegramId,
				},
			})
			return res.json(serializeBigInt(newUser))
		}

		if (clickBoost == user.clickBoost && timeBoost == user.timeBoost) {
			return res.json(serializeBigInt(user))
		}
		// Обновляем значения бустеры
		const updatedUser = await prisma.user.update({
			where: { telegramId },
			data: {
				clickBoost: clickBoost,
				timeBoost: timeBoost,
				nowScore: nowScore,
				lastActivity: new Date(),
				boostItems: boostItems
			},
		})

		return res.json(serializeBigInt(updatedUser))
	} catch (error) {
		console.error(error)
		return res.status(500).send('Server error')
	}
})

// Эндпоинт для обновления текущей даты пользователя по его Telegram ID
app.put('/api/user/update-date', async (req, res) => {
	const { telegramId } = req.body

	try {
		// Проверяем наличие пользователя в базе данных
		const user = await prisma.user.findUnique({
			where: { telegramId },
		})

		// Если пользователь не найден, создаем его с начальными значениями
		if (!user) {
			const newUser = await prisma.user.create({
				data: {
					telegramId: telegramId,
				},
			})
			return res.json(serializeBigInt(newUser))
		}
		// Обновляем поле createdAt текущей датой и временем
		const updatedUser = await prisma.user.update({
			where: { telegramId },
			data: {
				lastActivity: new Date(), // Устанавливаем текущее время
			},
		})

		return res.json(serializeBigInt(updatedUser)) // Возвращаем обновленные данные пользователя
	} catch (error) {
		console.error(error)
		return res.status(500).send('Server error')
	}
})

// Эндпоинт, чтобы увеличить счетчики при нажатии
app.post('/api/add', async (req, res) => {
	const { telegramId, pointsToAdd } = req.body

	try {
		// Обновляем количество очков (nowScore и totalScore)
		const user = await prisma.user.findUnique({
			where: { telegramId },
		})

		// Если пользователь не найден, создаем его с начальными значениями
		if (!user) {
			const newUser = await prisma.user.create({
				data: {
					telegramId: telegramId,
				},
			})
			return res.json(serializeBigInt(newUser))
		}

		// Обновляем значения nowScore и totalScore с учетом бонусов
		const updatedUser = await prisma.user.update({
			where: { telegramId },
			data: {
				nowScore: { increment: pointsToAdd },
				totalScore: { increment: pointsToAdd },
				lastActivity: new Date(),
			},
		})

		return res.json(serializeBigInt(updatedUser))
	} catch (error) {
		console.error(error)
		return res.status(500).send('Server error')
	}
})

// Получаем текущую дату и время на сервере
app.get('/api/current-date', (req, res) => {
	try {
		const currentDate = new Date()

		// Возвращаем текущую дату в формате ISO
		return res.json({ currentDate: currentDate.toISOString() })
	} catch (error) {
		console.error(error)
		return res.status(500).send('Server error')
	}
})

// Эндпоинт для получения рейтинга игроков
app.get('/api/users', async (req, res) => {
	try {
		const users = await prisma.user.findMany({
			orderBy: {
				totalScore: 'desc',
			},
		})
		return res.json(serializeBigInt(users))
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
})

// Эндпоинт для обновления данных в БД
app.post('/api/updateScore', async (req, res) => {
	const { telegramId, nowScore, totalScore } = req.body

	try {
		const user = await prisma.user.findUnique({
			where: { telegramId },
		})

		// Если пользователь не найден, создаем его с начальными значениями
		if (!user) {
			const newUser = await prisma.user.create({
				data: {
					telegramId: telegramId,
				},
			})
			return res.json(serializeBigInt(newUser))
		}

		// Обновляем значения nowScore и totalScore
		const updatedUser = await prisma.user.update({
			where: { telegramId },
			data: {
				nowScore: nowScore,
				totalScore: totalScore,
				lastActivity: new Date(),
			},
		})

		return res.json(serializeBigInt(updatedUser))
	} catch (error) {
		console.error(error)
		return res.status(500).send('Server error')
	}
})

app.use(express.static(path.join(__dirname, '..', 'client', 'build')))

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
})

app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`)
})
