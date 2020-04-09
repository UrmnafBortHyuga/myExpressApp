var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');

var app = express();


// CORSを許可する
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use((req, res, next) => {
//   // CORSのためのhttpリクエストヘッダー設定
//   // res.header('Access-Control-Allow-Origin', 'http://localhost:8080') // （必須）許可するリクエストURLを指定
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization') // （必須）許可するカスタムヘッダーの設定
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS') // 許可するメソッドの設定（コメントアウトしても動作する）
//   res.header('Access-Control-Max-Age', '600') // preflightリクエスト結果をキャッシュする時間の設定（コメントアウトしても動作する）
//   // （必須）preflightリクエストに対してのみ、httpOKステータスを返すために必要
//   if (req.method === 'OPTIONS') { 
//     res.status(200).send()
//   }
//   next();
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
