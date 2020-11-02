const router = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

const usersPath = path.join(__dirname, '../data', 'users.json');

const usersReadFile = (filePath) => fsPromises.readFile(filePath, { encoding: 'utf8' });

router.get('/users', (req, res) => {
 const file = usersReadFile(usersPath);
 file
 .then((data) => {
  const users = JSON.parse(data);
  return users;
 })
 .then((data) => {
  res.send(data);
 })

});

router.get('/users/:id', (req, res) => {
  const file = usersReadFile(usersPath);
  file
  .then((data) => {
   const users = JSON.parse(data);
   return users;
  })
  .then((data) => {
    const {id} = req.params;
    const user = data.find((person) => person._id === id);
  if(!user){
  res.status(404).send({ message: 'Пользователь с таким id не найдён' });
  return;
}
res.send(user);
  })
});
module.exports = router;

