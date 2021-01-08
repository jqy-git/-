const express = require('express');
const app = express()
const jwt = require('jsonwebtoken')

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '2803417518',
	database: 'study',
	insecureAuth: true
});
connection.connect();

//跨域设置
app.all('*', function (req, res, next) {
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin", "*");
	//跨域允许的请求方式 
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	//允许的header类型
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	if (req.method.toLowerCase() === 'options') {
		return res.sendStatus(200);  //让options尝试请求快速结束
	}
	next()
});

//token校验
app.use(function (req, res, next) {
	if (req.url === '/login' || req.url === '/register') next()
	else {
		const header = req.headers.authorization
		if (!header) return res.send({ code: '404', msg: '请携带token访问' })

		const token = header.split(' ').pop()
		let username = ''
		try {
			username = jwt.verify(token, 'asd').username
		} catch (e) {
			return res.send({ code: '0003', msg: "token格式错误" })
		}

		// next()

		let searchSql = 'select * from loader where id = ?'
		let searchSqlParams = [username]
		connection.query(searchSql, searchSqlParams, function (err, result) {
			if (err) {
				return res.send(err)
			} else if (!result[0]) {
				return res.send({ code: '0001', msg: "无效的token" })
			} else {
				next()
			}
		})
	}
})

app.post('/login', (req, res) => {
	const { username, password } = req.body
	let searchSql = 'select * from loader where id = ? and pw = ?'
	let searchSqlParams = [username, password]
	connection.query(searchSql, searchSqlParams, function (err, result) {
		if (err) {
			return res.send(err)
		} else if (!result[0]) {
			return res.send({ code: '0001', msg: "用户名或密码错误" })
		} else {
			const payload = { username }
			const secretOrPrivateKey = 'asd'
			const token = jwt.sign(payload, secretOrPrivateKey)
			// const token = 'token'
			return res.send({ code: "0000", token })
		}
	})
})

app.post('/register', (req, res) => {
	const { username, password, email } = req.body
	let addSql = 'INSERT INTO loader VALUES(?,?,?,?,?)'
	let addSqlParams = [username, password, email, null, null] // 增加的数据

	connection.query(addSql, addSqlParams, function (err, result) {
		if (err) {
			return res.send({ code: '0001', msg: "用户名已被占用" });
		}
		res.send({ code: '0000', msg: "注册成功" });
	});
})

app.post('/main/normalList/edit', (req, res) => {
	const { name, price } = req.body.product
	let { up } = req.body.product
	if (up === '未上架') up = 0
	else if (up === '0') up = 0
	else up = 1

	let upSql = 'UPDATE product SET price = ?, up = ? where name = ?'
	let upSqlParams = [price, up, name]
	connection.query(upSql, upSqlParams, function (err, result) {
		if (err) {
			return res.send({
				code: 'error',
				msg: '修改失败'
			});
		}
		res.send({
			code: 'success',
			msg: '修改成功'
		});
		// res.send(result)
	});
})

app.post('/main/normalList/search', (req, res) => {
	let { name, price, up } = req.body
	if (!name) name = '%'
	if (!price) price = '%'
	if (!up) up = '%'
	// console.log(defaultPageSize, currentPage);

	const searchSql = 'SELECT * FROM product where name like ? AND price like ? AND up like ?'
	let searchSqlParams = [name, price, up]
	connection.query(searchSql, searchSqlParams, function (err, result) {
		if (err) {
			return res.send({
				code: 'error',
				msg: '操作失败'
			});
		}
		res.send(result)
	});
})

app.post('/main/normalList/create', (req, res) => {
	const { name, price } = req.body.product
	let { up } = req.body.product
	if (up === '未上架') up = 0
	else if (up === '0') up = 0
	else up = 1

	let addSql = 'INSERT INTO product VALUES(?,?,?)'
	let addSqlParams = [name, price, up]
	connection.query(addSql, addSqlParams, function (err, result) {
		if (err) {
			return res.send({
				code: 'error',
				msg: '商品已存在'
			});
		}
		res.send({
			code: 'success',
			msg: '新增成功'
		});
	});
})

app.post('/delete', (req, res) => {
	const { name } = req.body
	// let modSql = 'UPDATE product SET price = ?, up = ? where id = ?'
	// let modSqlParams = []
	let delSql = 'DELETE FROM product where name = ?'
	let delSqlParams = [name]
	connection.query(delSql, delSqlParams, function (err, result) {
		if (err) {
			return res.send({
				code: 'error',
				msg: '删除失败'
			});
		}
		res.send({
			code: 'success',
			msg: '删除成功'
		});
	})
})

// connection.end();
app.listen(5000)