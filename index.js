const express = require('express');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const { join } = require('path');
const sassMiddleware = require('sass-middleware');

const { clientRouter } = require('./routers/client');
const { homeRouter } = require('./routers/home');

const app = express();
const PORT = 4000;

app.use(methodOverride('_method'));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(
  sassMiddleware({
    src: join(__dirname, 'public', 'scss'),
    dest: join(__dirname, 'public', 'css'),
    debug: true,
  })
);

app.use(express.static('public'));



app.use('/', homeRouter);
app.use('/client', clientRouter);

app.engine(
  '.hbs',
  hbs.engine({
    extname: '.hbs',
    //helpers: hbsHelpers,
  })
);
app.set('view engine', '.hbs');
app.set('views', './views');

app.listen(PORT, 'localhost', () => {
  console.log(`Nasłuchiwanie na porcie http://localhost:${PORT}`);
});
