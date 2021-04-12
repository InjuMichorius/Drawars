var socket = io()
var messages = document.querySelector('section ul')
var input = document.getElementById('user-input')
var username = document.getElementById('username')

username.onchange = function () {
    localStorage.setItem("username", username.value)
}

username = localStorage.getItem("username")

//Fire function when user sends message
document.querySelector('form').addEventListener('submit', (event) => {
    //Prevents form from redirecting user
    event.preventDefault()

    //If 
    if (input.value) {
        socket.emit('message', input.value)
        input.value = ''
    }
})

socket.on('message', function (message) {
    var element = document.createElement('li')
    element.textContent = username + message
    messages.appendChild(element)
    messages.scrollTop = messages.scrollHeight
})
