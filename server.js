var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db');
var path = require('path');
var alert = require('alert-node');
var hbs = require("hbs");

var userMenu = 0;
var obj;

var app = express(); // Создали сервер

app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname));
app.use(bodyParser.json()); // Правильный парсинг JSON, который передали в body
app.use(bodyParser.urlencoded({ extended: true })); // Правильный парсинг данных формы

app.get('/', function(req,res) {
	generateMenu();
	res.render('index.html', obj);
})

app.get('/index', function(req,res) {
	res.render('index.html', obj);
})

app.get('/authentication', function(req,res) {
	res.sendFile(path.join(__dirname) + '/html/authentication.html');
})

app.post('/authentication', function(req,res) {
	//db.get().dropDatabase();
	var userLogin = req.body.login;
	var userPassword = req.body.password;
	var inputValue = req.body.actionButton;

	if (userLogin == "" || userPassword == "") {
		alert('Логин или пароль заданы неверно!');
		return res.sendFile(path.join(__dirname) + '/html/authentication.html');
	} else {
		if (inputValue == "Войти") {
			db.get().collection('users').findOne({login : userLogin, password : userPassword}, function (err, user) {
				if (err) return res.sendStatus(500);
				if (!user) {
					alert("Неверный логин или пароль!");
					return res.sendFile(path.join(__dirname) + '/html/authentication.html');
				}
				alert("Добро пожаловать " + userLogin);
				userMenu = 1;
				generateMenu();
				res.render('index.html', obj);
			})	
		} else if (inputValue == "Зарегистрироваться"){
			db.get().collection('users').insertOne({login : userLogin, password : userPassword}, function(err, user) {
				if (err) return res.sendStatus(500);
				alert("Пользователь " + userLogin + " зарегистрирован");
			})
		}
	}
})

app.get('/trophies', function(req,res) {
	res.render('trophies.html', obj);
})

app.get('/team', function(req,res) {
	res.render('team.html', obj);
})

app.get('/uniform', function(req,res) {
	res.render('uniform.html', obj);
})

app.get('/employees', function(req,res) {
	res.render('employees.html', obj);
})

app.get('/exit',function(req,res) {
	alert("Выход успешен!");
	userMenu = 0;
	generateMenu();
	res.render('index.html', obj);
})

app.post('/add',function(req,res) {
	db.get().collection('employees').insertOne({name : req.body.name, salary : req.body.salary}, function(err, user) {
		if (err) return res.sendStatus(500);
	})
})

db.connect('mongodb://localhost:27017/mydatabase', function(err) {
	if (err) {
		return console.log(err);
	} else {
		console.log('База данных успешно подключена!');
	}
	app.listen(3012, function() {
		console.log('Сервер успешно запущен!');
	})
})

function generateMenu() {
  	if (userMenu == 0) 
		obj = {menu1 : '', menu2 : '', menu3 : '<a class="authClass" href="authentication">Войти</a>'}
	else 
		obj = {menu1 : '<a href="employees">Руководство</a>', menu2 : '<a href="exit">Выйти</a>', menu3 : ''}
}

// NPM is a package manager for Node.js packages, or modules if you like
// Express is Node.js web application framework that provides a robust set of features for web and mobile applications