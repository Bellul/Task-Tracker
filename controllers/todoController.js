const mongoose = require('mongoose');

const mongoUser = encodeURIComponent('JohnTask');
const mongoPass = encodeURIComponent('TFtQBgaH3RkaMort');

// // connect to the mongoose database
// mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPass}@tasktrackerapp.ntgfxik.mongodb.net/?retryWrites=true&w=majority/todo`);


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${mongoUser}:${mongoPass}@tasktrackerapp.ntgfxik.mongodb.net/?retryWrites=true&w=majority/todo`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

//create a schema for the data
var todoSchema = new mongoose.Schema({
    task: String
});

//create todo model
var Todo = mongoose.model('Todo', todoSchema);

var taskOne = Todo({task: 'buy flowers'}).save(function(err){
    if(err) throw err;
    console.log('task saved');
});


var data = [{task: 'get milk'}, {task: 'walk dog'}, {task: 'kick some coding'}];

module.exports = function(app){
    
    app.get('/todo', function(req, res){
        res.render('todo', {todos: data});
    });

    app.post('/todo', function(req, res){
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo/:task', function(req, res){
        data = data.filter(function(todo){
            return todo.task.replace(/ /g, '-') !== req.params.task;
        });
        res.json(data);
    });


};


//explains errors
mongoose.connect(
  process.env.MONGO_URL,
//   options,
  (err) => {
   if(err) console.log(err) 
   else console.log("mongdb is connected");
  });