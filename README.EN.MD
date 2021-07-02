# Author: Konstantin Okhlynin
# Mesto-Backend
### Diploma project of the web development course on the online learning portal Practicum by Yandex. Backend for the [Mesto](https://github.com/KonstantinOkhlynin/mesto--frontend), which allows you to register and authorize a user on the website, as well as like, create and delete your cards, change the user's avatar, name and basic user information.
## Languages
### ‣ JavaScript(ES6);
## Framework
### ‣ Express.js;
## Code execution environment
### ‣ Node.js;
## Used npm packages
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
## Instructions for checking the health of the backend
### 1. You must have the following programs installed:
#### ‣ Postman(or similar);
#### ‣ MongoDB;
#### ‣ Node.js;
### 2. Next, execute the following steps:
#### ‣ Installing npm dependencies using the command
```bash
# npm install
```
#### ‣ Launch the backend using the command
```bash
# npm run dev
```
#### ‣ Run Mongodb using the command
```bash
# mongod
```
### 3. Then open the program for testing the Api (Postman, etc. ) and check the following requests:
#### ‣ POST/`http://localhost:3000/signup` - a new user is created. In the body, you must specify the following fields in JSON format:
##### ‣ name (User name);
##### ‣ email (User's Email address);
##### ‣ password (User password);
##### ‣ about (User Information);
##### ‣ avatar (Link to avatar);
### Example:
``` json
{
"name": "Kostya",
"email": "Kostya.Okhlynin@gmail.com",
"password": "frfsdk123lsd",
"about": "My name is Kostya",
"avatar": "https://image.com/image"
}
```
#### ‣ POST/`http://localhost:3000/signin` - user authorization. In the body, you must specify the following fields in JSON format:
##### email email (User's email);
##### ‣ password (User password);
### Example:
``` json
{
"email": "Kostya.Okhlynin@gmail.com",
"password": "frfsdk123lsd"
}
```
#### ‣ GET/`http://localhost:3000/users/me` - a JSON object of a specific user is output, if the user is not found, an error is output. Instead of `me`, you need to substitute the id of the user you want to find. Usually the id is returned when the user is created.
#### ‣ GET/`http://localhost:3000/users` - displays a JSON list of all users.
#### ‣ GET/`http://localhost:3000/users/id` - outputs the JSON of a specific user, if the user is not found, an error will be returned.
#### ‣ GET/`http://localhost:3000/cards` - displays a JSON list of all cards.
#### ‣ POST/`http://localhost:3000/cards` - a card is being created. In the body, you must specify the following fields in JSON format:
##### ‣ name (Card name);
##### ‣ link (Link to the card image);
### Example:
``` json
{
"name": "Moon",
"link": "https://image.com/moon",
}
```
#### ‣ DELETE/`http://localhost:3000/cards/id` - delete your own cards. The user cannot delete someone else's card. Instead of `me`, you need to substitute the id of the article you want to delete. Usually, the id is returned when the article is created.
## Attention! All requests except signup and signin are protected by authentication. In order for you to create, delete, and receive cards, you need to save the token in the Api testing program. The token is returned when you log in, you need to put it in the `Authorization 'section and select the `Bearer token' type.
