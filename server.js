require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const data = require('./data.json');

const app = express();

const config = require('./config');

const { hostname, port } = config;
module.exports = router;
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
  extended: false,
}));

app.get('/api/v1/users', (req, res) => {
  res.render('layout', {
    students: data.students,
  });
});

router.get('/api/v2/users', (req, res) => {
  res.send(JSON.stringify(data));
});

app.get('/api/v1/users/edit/:id', (req, res) => {
  const findId = id => data.students.find(student => student.id === id);
  res.render('edit', {
    student: findId(parseInt(req.params.id, 10)),
  });
});

app.post('/api/v1/users/edit', (req, res) => {
  const findId = id => data.students.find(student => student.id === id);
  const student = findId(parseInt(req.body.id, 10));
  student.firstName = req.body.firstName;
  student.lastName = req.body.secondName;
  res.redirect('/api/v1/users');
});

app.post('/api/v1/users', (req, res) => {
  const newTodo = { ...req.body };
  newTodo.id = data.students.length + 1;
  data.students = [...data.students, newTodo];
  res.redirect('/api/v1/users');
});


app.post('/api/v1/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (data.students.filter(todo => todo.id === id).length !== 0) {
    data.students = data.students.filter(todo => todo.id !== id);
  }
  res.redirect('/api/v1/users');
});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
