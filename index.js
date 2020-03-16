
const express = require('express')
const app = express()
const mysql = require('mysql2');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'rtlry',
  database: 'LPDIP01'
});
app.get('/todos', function (req, res) {
  connection.query(
    'SELECT * FROM todo',
    function(err, results, fields) {
      res.json(results)
    }
  );
})
app.get('/todo/:id', function (req, res) {
  connection.query(
    'SELECT * FROM todo WHERE id=?',
    [req.params.id],
    function(err, results, fields) {
      res.json(results)
    }
  );
})
app.post('/todo', function (req, res) {
  connection.query(
    'INSERT INTO todo (label, isdone) VALUES (?,false)',
    [req.body.label],
    function(err, results, fields) {
      res.json(results)
    });
})
app.put('/todo/:id', function (req, res) {
  connection.query(
    'UPDATE todo SET isdone=true WHERE id=?',
    [req.params.id],
    function(err, results, fields) {
      res.json(results)
    });
})
app.delete('/todo/:id', function (req, res) {
  connection.query(
    'DELETE FROM todo WHERE id=?',
    [req.params.id],
    function(err, results, fields) {
      res.json(results)
    });
})
app.get('/', function (req, res) {
  res.send('Accueil')
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})