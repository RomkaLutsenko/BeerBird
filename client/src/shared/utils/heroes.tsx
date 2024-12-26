import AlenaAImage from '../../shared/assets/heroes/Алена_А.jpg'
import AlenaFImage from '../../shared/assets/heroes/Алена_Ф.jpg'
import VasilisaImage from '../../shared/assets/heroes/Василиса.jpg'
import VovaRImage from '../../shared/assets/heroes/Вова_Р.jpg'
import DanyaHImage from '../../shared/assets/heroes/Даня_Х.jpg'
import DimaK1Image from '../../shared/assets/heroes/Дима_К1.jpg'
import IlyaImage from '../../shared/assets/heroes/Илья.jpg'
import LidaImage from '../../shared/assets/heroes/Лида.jpg'
import MaksImage from '../../shared/assets/heroes/Макс.jpg'
import MashaVImage from '../../shared/assets/heroes/Маша_В.jpg'
import MashaNImage from '../../shared/assets/heroes/Маша_Н.jpg'
import MishaImage from '../../shared/assets/heroes/Миша.jpg'
import RaliaImage from '../../shared/assets/heroes/Ралия.jpg'
import RomaImage from '../../shared/assets/heroes/Рома.jpg'
import SofaPImage from '../../shared/assets/heroes/Соня.jpg'
import YarikImage from '../../shared/assets/heroes/Ярик.jpg'

export const heroList = [
	{
		name: 'Илья Политико',
		image: IlyaImage,
		description: `Командир, 20 лет. 
			Справедливый мужчина спортивного телосложения. 
			Полу женат.`,
		secretDescription: `Любвиобилен, заботлив, умеет удачно притворяться добрым. 
			Характер скрытный. 
			Любит спорт. 
			Многозадачен. 
			Учит кадетов уму разуму.`,
		clickBoost: 1,
		timeBoost: 0,
		cost: 500,
		isPurchased: false,
	},
	{
		name: 'Лидочка Сабутина',
		image: LidaImage,
		description: `Обладательница милых щëчек. 
			Много ест и всегда поëт. 
			Вежлива, умна, добра, приветлива, хороша собой, слушает маму.`,
		secretDescription: `Часто страдает от своей прямолинейности. 
			Ради семьи готова на всë. 
			Охотится за мужчинами. 
			Характер тяжёлый. 
			Часто опаздывает, любит танцы, обожает ловить снег ртом.`,
		clickBoost: 1,
		timeBoost: 1,
		cost: 2500,
		isPurchased: false,
	},
	{
		name: 'Ралия Роянова',
		image: RaliaImage,
		description: `Девушка - обыкновенная. 
			Обожает шутить шутки, слушать шутки тоже обожает. 
			Смешливая. Ха-ха`,
		secretDescription: `Ем помидоры с сахаром. 
			Назвала свою кошку *Пиво*. 
			Человеческо-женская особь`,
		clickBoost: 0,
		timeBoost: 2,
		cost: 10000,
		isPurchased: false,
	},
	{
		name: 'Алена Азарова',
		image: AlenaAImage,
		description: 'Учитель русского языка и литературы.',
		secretDescription: `Ем мороженое только ложкой. 
			Ни разу не была в караоке (но очень хотела бы). 
			Не умею плавать, буду тонуть - утону.`,
		clickBoost: 2,
		timeBoost: 2,
		cost: 25000,
		isPurchased: false,
	},
	{
		name: 'Даниил Хуснутдинов',
		image: DanyaHImage,
		description: `Cамостоятельный молодой человек (по версии Мамы) 
			Характер — медленный.
			КМС по добыче деревянных ящиков.`,
		secretDescription: `Однажды сам расстался с девушкой, пока она не узнала о моем решении и мы снова стали встречаться (прошло 30 минут).`,
		clickBoost: 3,
		timeBoost: 0,
		cost: 50000,
		isPurchased: false,
	},
	{
		name: 'Владимир Рузаев',
		image: VovaRImage,
		description: 'Рузаев аКа "А кто это сделал?"',
		secretDescription: `80 кг нежности. 
			Танина собственность.
			Танцует народник дольше, чем живет`,
		clickBoost: 0,
		timeBoost: 3,
		cost: 100000,
		isPurchased: false,
	},
	{
		name: 'Ярослав Волынкин',
		image: YarikImage,
		description: `Смотрю на вас и на Кавказ. 
			Самокат - с сердцем в такт`,
		secretDescription: `Поступил в академию ФСИН и её закрыли, теперь я учусь в СФУ`,
		clickBoost: 3,
		timeBoost: 3,
		cost: 250000,
		isPurchased: false,
	},
	{
		name: 'Максим Регици',
		image: MaksImage,
		description: 'Нет он не немец, но от гражданства бы не отказался.',
		secretDescription: `Семейное положение — финансово не потянет. 
			Окружающие думают, что он хорошо командует, но обстоятельства думают иначе.`,
		clickBoost: 4,
		timeBoost: 0,
		cost: 500000,
		isPurchased: false,
	},
	{
		name: 'Софья Погодаева',
		image: SofaPImage,
		description: 'Чудо, золото и ягодка.',
		secretDescription: `Ответственность - её второе имя.
			Голову медведя видели? Это она сделала.
			Половину реквизита тоже она сделала.`,
		clickBoost: 0,
		timeBoost: 4,
		cost: 1000000,
		isPurchased: false,
	},
	{
		name: 'Мария Набатникова',
		image: MashaNImage,
		description:
			'Вся такая офранцузенная и хорошо откапучиненная, но имеет стëбные заметочки про каждого',
		secretDescription: `Говорит на 3 иностранных языках.
			Не умеет готовить яичницу.
			Любит всё, что толстое и пушистое.
			Собирает кофейные стаканчики из разных кофеен.
			Вы подумаете, что она живет, как в Pinterest.`,
		clickBoost: 4,
		timeBoost: 4,
		cost: 2500000,
		isPurchased: false,
	},
	{
		name: 'Василиса Ильина',
		image: VasilisaImage,
		description: `12 лет отходила на народные танцы`,
		secretDescription: `В детстве чуть не украли китайцы.
			Не ест рыбу, но почему-то обожаю суши.
			По карме должна заниматься волонтерством.
			Чертила (то есть архитектор)`,
		clickBoost: 5,
		timeBoost: 0,
		cost: 5000000,
		isPurchased: false,
	},
	{
		name: 'Мария Вставская',
		image: MashaVImage,
		description: `Вечно всё фотографирует`,
		secretDescription: `Работает в детском саду.
			Не любит пиццу.
			Не готовит «брауни», потому что однажды переборщила с содой, и это было ужасно.
			Заслуженный старик отряда.`,
		clickBoost: 0,
		timeBoost: 5,
		cost: 10000000,
		isPurchased: false,
	},
	{
		name: 'Алёна Федоренчук',
		image: AlenaFImage,
		description: `Любит гладить собак. 
			В детстве любила собирать пазлы, в студенчестве приключения, а после - трамваи.`,
		secretDescription: `Не любит телефонные разговоры. 
			Не вышла ростом, вышла носом. 
			Не натуральный блондин.  
			Любит добрые мемы.`,
		clickBoost: 5,
		timeBoost: 5,
		cost: 25000000,
		isPurchased: false,
	},
	{
		name: 'Михаил Гусаков',
		image: MishaImage,
		description: `Главный босс в 2022-2023`,
		secretDescription: `Любимый звук - это автозвук. 
		Держит все под контролем. 
		Плов из май лов.`,
		clickBoost: 6,
		timeBoost: 6,
		cost: 50000000,
		isPurchased: false,
	},
	{
		name: 'Роман Луценко',
		image: RomaImage,
		description: `Отец этой игры`,
		secretDescription: `У него есть 1 секрет, который нельзя разглашать. 
		На страже твоего сна. 
		Скалу Джонсона знаете? Его Рома тренировал.`,
		clickBoost: 7,
		timeBoost: 7,
		cost: 100000000,
		isPurchased: false,
	},
	{
		name: 'Дмитрий Кремлев',
		image: DimaK1Image,
		description: `Человек, который много говорит, но о нем мало что известно. 
			Характер скрытный. 
			Семейное положение: секретно. 
			Главный по связям.`,
		secretDescription: `Настолько секретно, что даже родная бабушка не знает.`,
		clickBoost: 10,
		timeBoost: 10,
		cost: 999999999,
		isPurchased: false,
	},
]
