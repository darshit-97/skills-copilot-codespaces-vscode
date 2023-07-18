// create web server
var express = require('express')
var app = express()
// create server
var server = require('http').createServer(app)
// create socket
var io = require('socket.io')(server)
// create mongoose
var mongoose = require('mongoose')
// connect to mongo db
mongoose.connect('mongodb://localhost/comments')
// create schema
var Schema = mongoose.Schema
// create model
var Comment = mongoose.model('Comment', new Schema({
  name: String,
  comment: String
}))
// listen to port 3000
server.listen(3000)
// use public folder
app.use(express.static(__dirname + '/public'))
// get request
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
})
// create connection
io.on('connection', function(socket){
  console.log('a user connected')
  // get comment
  socket.on('get comment', function(){
    Comment.find({}, function(err, docs){
      if(err) throw err
      socket.emit('get comment', docs)
    })
  })
  // post comment
  socket.on('post comment', function(data){
    var comment = new Comment({name: data.name, comment: data.comment})
    comment.save(function(err){
      if(err) throw err
      io.emit('post comment', data)
    })
  })
})