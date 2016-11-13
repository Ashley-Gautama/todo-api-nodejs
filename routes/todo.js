var moment = require('moment');


var mongoose = require('mongoose'),
    Todo = mongoose.model('Todo');




  	User = mongoose.model('User');




module.exports = {

    all: function(req, res){
      // if(req.user.name!==null){
        console.log('we are in todo.all')
        Todo.find({name:req.user.name}, function(err, todos){
            if(err) res.render('error', { error: 'Could not fetch items from database :('});
            console.log('in the callback')
            res.render('todos', { todos: todos, moment: moment,name:req.user.name });
        });
      // }
      // else{
      //   console.log("not logged in")
      //   res.redirect("/");
      // }
    },

    create: function(req, res, next){
      if (!req.body || !req.body.content || !req.body.due_date || !req.body.priority)
        return res.render("error", {error: "Please fill in all the  fields!" });


        // create todo
      var todo=new Todo({

        name:req.user.name,
        content:req.body.content,
        priority:req.body.priority,
        due_date:req.body.due_date,
      });
        todo.save(function (err) {if (err) console.log ('Error on save!')});

        res.redirect('/todos');


    },
    destroy: function(req, res){
        var id = req.params.id;

        Todo.findByIdAndRemove(id, function(err, todo){
            if(err) res.render('error', { error: 'Error deleting todo'});
            res.redirect('/todos');
        });
    },
