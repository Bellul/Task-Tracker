const express = require('express');
const todoController = require('./controllers/todoController')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');


app.use(express.static('public'));

app.use('/assets', express.static(__dirname + 'public/assets'))

//fire controllers
todoController(app);

const port = 8080;

app.listen(port, () => console.log(`Port ${port} is up and running`));