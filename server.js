const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const port = process.env.PORT || 3000

//Set default path to public
app.use(express.static(path.resolve('public')))

//Fires a function on user connection with the socket
io.on('connection', (socket) => {
  console.log('New user connected')

  socket.on('message', (message) => {
    if (message === 'snorkel') {
        io.emit('message', "User guessed the word correctly!")
    } else {
        io.emit('message', message)
    }
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
    io.emit('message', "A user has left the chat")
  })
})

//Our node app is live!
http.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})