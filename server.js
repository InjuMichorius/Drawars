import { ifError } from 'assert';
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io'; //replaces (import socketIo from 'socket.io')

import { userJoin, getCurrentUser, userLeave, getRoomUsers } from './utils/users.js';

const app = express();
const port = process.env.PORT || 2424;
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(express.static(path.resolve('public')));

let randomWordEasy
let randomWordMedium;
let randomWordHard;

async function getRandomWordEasy() {
  const response = await fetch('https://random-word-api.herokuapp.com/word?length=4');
  randomWordEasy = await response.json();
  console.log(randomWordEasy);
  setTimeout(getRandomWordEasy, 10000);
  io.in('Easy').emit('randomWord', randomWordEasy);
}

async function getRandomWordMedium() {
  const response = await fetch('https://random-word-api.herokuapp.com/word?length=6');
  randomWordMedium = await response.json();
  // console.log(randomWord);
  setTimeout(getRandomWordMedium, 20000);
  io.in('Medium').emit('randomWord', randomWordMedium);
}

async function getRandomWordHard() {
  const response = await fetch('https://random-word-api.herokuapp.com/word');
  randomWordHard = await response.json();
  // console.log(randomWord);
  setTimeout(getRandomWordHard, 10000);
  io.in('Hard').emit('randomWord', randomWordHard);
}
getRandomWordEasy();
getRandomWordMedium();
getRandomWordHard();

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinRoom', ({ username, room }) => {
    let points = 0;
    const user = userJoin(socket.id, username, room, points);
    socket.join(user.room);

    socket.broadcast.to(user.room).emit('message', `${user.username} has joined`);

    //Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });
  socket.on('message', (message) => {
    const user = getCurrentUser(socket.id);
    let formattedMessage = user.username + ': ' + message;
    if (message == randomWordEasy || message == randomWordMedium || message == randomWordHard) {
      console.log(user.points += 100)
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
      socket.emit('message', "You've guessed the word correctly!");
      socket.broadcast.to(user.room).emit('message', `Word has been guessed by ${user.username}!`);
    } else {
      io.to(user.room).emit('message', formattedMessage);
    }
  });

  // // socket.on('username', (username) => {
  // //   console.log(username);
  // //   let object = { username: username, id: socket.id, points: 0 };
  // //   users.push(object);
  // //   io.emit('username', { username: username, id: socket.id, points: 0 });
  // // });

  // socket.on('message', (message) => {
  //   let username;
  //   for (let i = 0; i < users.length; i++) {
  //     if (users[i].id == socket.id) {
  //       username = users[i].username;
  //     }
  //   }
  //   if (message == randomWord) {
  //     for (let i = 0; i < users.length; i++) {
  //       if (users[i].id == socket.id) {
  //         users[i].points += 100;
  //         io.emit('username', { username: username, id: socket.id, points: users[i].points });
  //       }
  //     }
  //     socket.emit('message', "You've guessed the word correctly!");
  //     socket.broadcast.emit('message', `Word has been guessed by ${username}!`);
  //   } else {
  //     let formattedMessage = username + ': ' + message;
  //     io.emit('message', formattedMessage);
  //   }
  // });

  // socket.on('checkAnswer', (message) => {
  //   let username;
  //   for (let i = 0; i < users.length; i++) {
  //     if (users[i].id == socket.id) {
  //       username = users[i].username;
  //     }
  //   }

  //   // console.log('The random word is: ' + randomWord)
  //   if (message === 'Hello world') {
  //     let succesMessage = username + ' guessed the word correctly!';
  //     io.emit('checkAnswer', succesMessage);
  //   }
  // });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit('message', `${user.username} has left the chat`);

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

httpServer.listen(port, () => {
  console.log('listening on port ', port);
});
