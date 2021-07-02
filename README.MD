# Author: Konstantin Okhlynin
# [**English Readme**](https://github.com/KonstantinOkhlynin/mesto--backend/blob/main/README.EN.MD)
# Mesto-Backend
### Проектная работа курса веб-разработки на портале онлайн обучения Яндекс.Практикум. Бэкенд для веб-сайта [Mesto](https://github.com/KonstantinOkhlynin/mesto--frontend), который позволяет регистрировать и выполнять авторизацию пользователя на веб-сайте, а также лайкать, создавать и удалять свои карточки, менять аватар пользователя, имя и основную информацию пользователя. 
## Языки
### ‣ JavaScript(ES6);
## Фреймворк
### ‣ Express.js;
## Среда выполнения кода
### ‣ Node.js;
## Используемые npm-пакеты
#### ‣ [bcryptjs](https://www.npmjs.com/package/bcryptjs);
#### ‣ [body-parser](https://www.npmjs.com/package/body-parser);
#### ‣ [celebrate](https://www.npmjs.com/package/celebrate);
#### ‣ [jest](https://www.npmjs.com/package/jest);
#### ‣ [dotenv](https://www.npmjs.com/package/dotenv);
#### ‣ [express](https://www.npmjs.com/package/express);
#### ‣ [express-winston](https://www.npmjs.com/package/express-winston);
#### ‣ [crypto-js](https://www.npmjs.com/package/crypto-js);
#### ‣ [jsonwebtoken](https://www.npmjs.com/package/file-loader);
#### ‣ [mongoose](https://www.npmjs.com/package/mongoose);
#### ‣ [validator](https://www.npmjs.com/package/validator);
#### ‣ [winston](https://www.npmjs.com/package/winston);
#### ‣ [eslint](https://www.npmjs.com/package/eslint);
#### ‣ [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base);
#### ‣ [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import);
#### ‣ [nodemon](https://www.npmjs.com/package/nodemon);
## Инструкция для проверки работоспособности бэкенда
### 1. У вас должны быть установлены следующие программы:
#### ‣ Postman(или аналоги);
#### ‣ MongoDB;
#### ‣ Node.js;
### 2. Далее выполняем слудующие шаги:
#### ‣ Устанавливаем npm-зависимости с помощью команды
```bash
# npm install
``` 
#### ‣ Запускаем бэкенд с помощью команды
```bash
# npm run dev
``` 
#### ‣ Запускаем Mongodb с помощью команды
```bash
# mongod
``` 
### 3. После чего открываем программу для тестирования Api (Postman и др.) и проверяем следующие запросы:
#### ‣ POST/`http://localhost:3000/signup` - создаётся новый пользователь. В теле необходимо указать следующие поля в формате JSON: 
##### ‣ name (Имя пользователя); 
##### ‣ email (Почта пользователя);
##### ‣ password (Пароль пользователя);
##### ‣ about (Информация пользователя);
##### ‣ avatar (Ссылка на аватар);
### Пример:
```json
{
    "name": "Kostya",
    "email": "Kostya.Okhlynin@gmail.com",
    "password": "frfsdk123lsd",
    "about": "My name is Kostya",
    "avatar": "https://image.com/image" 
}
```
#### ‣ POST/`http://localhost:3000/signin` - авторизация пользователя. В теле необходимо указать следующие поля в формате JSON:
##### ‣ email (Почта пользователя);
##### ‣ password (Пароль пользователя);
### Пример:
```json
{
    "email": "Kostya.Okhlynin@gmail.com",
    "password": "frfsdk123lsd" 
}
```
#### ‣ GET/`http://localhost:3000/users/me` - выводится JSON объект конкретного пользователя, если пользователь не найден выводится ошибка. Вместо `me` нужно подставить id пользователя, которого вы хотите найти. Обычно id возвращается при создании пользователя. 
#### ‣ GET/`http://localhost:3000/users` - выводится JSON список всех пользователей.
#### ‣ GET/`http://localhost:3000/users/id` - выводится JSON конкретного пользователя, если пользователь не найден, вернется ошибка.
#### ‣ GET/`http://localhost:3000/cards` - выводится JSON список всех карточек.
#### ‣ POST/`http://localhost:3000/cards` - создается карточка. В теле необходимо указать следующие поля в формате JSON: 
##### ‣ name (Название карточки); 
##### ‣ link (Ссылка на изображение карточки);
### Пример:
```json
{
    "name": "Moon",
    "link": "https://image.com/moon",
}
```
#### ‣ DELETE/`http://localhost:3000/cards/id` - удаление собственных карточек. Пользователь не может удалить чужую карточку. Вместо `me` нужно подставить id статьи, которую вы хотите удалить. Обычно id возвращается при создании статьи.
## Внимание! Все запросы кроме регистрации (signup) и авторизации (signin), защищены аутентификацией. Чтобы вы смогли создавать, удалять и получать карточки, нужно в программе для тестирования Api сохранить токен. Токен возвращается когда вы авторизируетесь, его нужно поместить в раздел `Authorization` и выбрать тип `Bearer token`.

