let socket = io();

const usernameListSection = document.getElementById('user-display');
const usernameSection = document.getElementById('username-section');
const chatSection = document.getElementById('chat-section');
const randomWordText = document.getElementById('random-word-text');

const roomNameText = document.getElementById('room-name');

//Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

//Join room
socket.emit('joinRoom', { username, room });

//Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

//Message Functionality
let messages = document.getElementById('message-box');
let messageInput = document.getElementById('message-input');

document.getElementById('message-form').addEventListener('submit', event => {
  event.preventDefault();
  if (messageInput.value) {
    socket.emit('message', messageInput.value);
    socket.emit('checkAnswer', messageInput.value);
    messageInput.value = '';
  }
});

socket.on('randomWord', word => {
  let x = word.toString();
  console.log(scramble(x));
  function scramble(a) {
    a = a.split("");
    for (var b = a.length - 1; 0 < b; b--) {
      var c = Math.floor(Math.random() * (b + 1)); d = a[b]; a[b] = a[c]; a[c] = d;
    }
    return a.join("");
  }
  scramble(x);
  randomWordText.innerHTML = `<p>${scramble(x)}</p>`;
});

socket.on('message', message => {
  messages.appendChild(Object.assign(document.createElement('li'), { textContent: message }));
  messages.scrollTop = messages.scrollHeight;
});

socket.on('checkAnswer', username => {
  messages.appendChild(Object.assign(document.createElement('li'), { textContent: username }));
  messages.scrollTop = messages.scrollHeight;
});

//Username Functionality
let usernameInput = document.getElementById('username-input');

socket.on('username', user => {
  usernameList.insertAdjacentHTML('beforeend',
    `<li id="${user.id}">
      <p>${user.username}</p>
      <p>${user.points}</p>
  </li>`);
});

//Roomname
function outputRoomName(room) {
  roomNameText.innerText = room;
}

function outputUsers(users) {
  usernameList.innerHTML = `
    ${users.map(user => `<li>${user.username}${user.points}</li>`).join('')}
  `;
}