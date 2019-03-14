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

app.get('/', (req, res) => {
  res.render('layout', {
    students: data.students,
  });
});

app.get('/edit/:id', (req, res) => {
  const findId = id => data.students.find(student => student.id === id);
  res.render('edit', {
    student: findId(parseInt(req.params.id, 10)),
  });
});

app.post('/edit', (req, res) => {
  const findId = id => data.students.find(student => student.id === id);
  const student = findId(parseInt(req.body.id, 10));
  student.firstName = req.body.firstName;
  student.lastName = req.body.secondName;
  res.redirect('/');
});

app.post('/', (req, res) => {
  const newTodo = { ...req.body };
  newTodo.id = data.students.length + 1;
  data.students = [...data.students, newTodo];
  res.redirect('/');
});


app.post('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (data.students.filter(todo => todo.id === id).length !== 0) {
    data.students = data.students.filter(todo => todo.id !== id);
  }
  res.redirect('/');
});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
