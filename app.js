const createError = require('http-errors');
const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

require('dotenv').config()

const indexRouter = require('./routes/index');
const blogRouter = require('./routes/blog');
const usersRouter = require('./routes/users');

const app = express();

// Discourage hax0rs
app.disable('x-powered-by');

// view engine setup
const expressHandlebarsConfig = {
    layoutsDir: 'views/layouts/',
    defaultLayout: 'layout.hbs',
    extname: '.hbs',
    partialsDir: "views/partials/",
    helpers: {
        dateFormat: require('handlebars-dateformat'),
        areEqual: (arg1, arg2) =>  arg1 === arg2,
        startsWith: (arg1, arg2) => {
            console.error(arg1, arg2);
            if (arg1 === undefined || arg2 === undefined) {
                return false;
            }
            return arg1.indexOf(arg2) === 0
        },
        json: json => JSON.stringify(json),
        styleSuffix: (baseClass, styleSuffix) => styleSuffix === undefined ? baseClass : `${baseClass} ${baseClass}-${styleSuffix}`,
    }
};
app.engine('hbs', exphbs(expressHandlebarsConfig));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  includePaths: [path.join(__dirname, 'node_modules/')],
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/hammerjs'));

const currentPathMiddleware = (req, res, next) => {
    res.locals.currentPath = req.originalUrl;
    next();
};

app.use('/', currentPathMiddleware, indexRouter);
app.use('/blog', currentPathMiddleware, blogRouter);
app.use('/users', currentPathMiddleware, usersRouter);

app.set("blogPostsURL", process.env.BLOG_API_URL);
app.set("feedbackEmailAddress", process.env.FEEDBACK_EMAIL_URL);

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

