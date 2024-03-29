# WordGuesser ❓
![](https://www.denkspelletjes.nl/uploaded/game/screenshot/guess-word-800.jpg)
Word Guesser is a school project I made where players can choose a difficulty and guess the scrambled word. A player can get points by guessing the right word.

[Click here for the live demo](word-gues.herokuapp.com/)

# Table of Contents 🧭
1. [Goal](https://github.com/InjuMichorius/ReadEar#goal-)
2. [Getting started](https://github.com/InjuMichorius/Drawars#getting-started-)
3. [Wishlist](https://github.com/InjuMichorius/Drawars#feature-wishlist--backlog-)
4. [Practises](https://github.com/InjuMichorius/Drawars#design-patterns-and-best-practices-)
5. [Packages](https://github.com/InjuMichorius/Drawars#packages-used-)

# Goal 💪🏻
> I want to be able to play a word guess game with my friends, seeing their scores and choose my own difficulty.

# Getting started ✨
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Technical requirements
To run this project you'll need [Git](https://git-scm.com/downloads), [Nodejs](https://nodejs.org/en/download/) and any [code editor](https://code.visualstudio.com/download)

## 📥 Installing
### 1. Clone this repository 👯
Before we can get started, we'll need to clone this repository. We can do this by typing the following line of code in the terminal:
```bash
git clone https://github.com/InjuMichorius/drawars.git
```
### 2. Install the packages 💻
First we need to install the used NPM packages.
```bash
npm install
```
### 3. Start developer environment 🎬
Now we can run our application, by running the following line of code in your terminal:
```bash
npm run dev
```

### 4. Navigate to localhost 🌐
Congratulations! If everything works, you should be able to see the application running in your browser. Please note that the port won't always be the same number.
```
http://localhost:2424
```

# Data life cycle
![](https://github.com/InjuMichorius/Drawars/blob/main/public/images/datalifecicle.jpg)

# Real-time events

### joinRoom
This event is triggered by the first button, when the user has chosen a username and room. On the server side, the username gets pushed into the usernames array of that specific room.

### message
This event is triggered when a message is sent. The event checks on the server side if the message has the correct answer, if this is true it will send a succes message to all users in the current room. If it is not the correct answer, it will just show as a standard message.

### Disconnect
When a user disconnects, this user gets removed from the usernames array of that room. There will also be a message saying the user has left.

# Feature wishlist / backlog 👑
Below is a list of features I'd love to add to this application. The features are split up using the **M**o**SC**o**W** method.

**M** - Must haves
_These features are requirements for the end product_
- [x] Multiple live rooms
- [x] Score counter
- [x] Random word

**S** - Should haves
_These features are wanted, but not necessary for a usable product_
- [x] Other player display
- [x] Messages if player guesses word
- [ ] Disallow user to guess word multiple times

**C** - Could haves
_These features can be added if there is enough time to do so_
- [ ] Victory screen
- [ ] Proper word api

**W** - Would haves
_These features can be added in the future_
- [ ] Character customization

# Design patterns and Best Practices 👩🏻‍💻
__Code standards are important__ when working on any project; your code stays *consistent* and is *readable* for everyone. I defined code standards for __HTML__, __CSS__ and __JS__ while working on this project.

## Javascript code standards
* Variables & functions are written in __camelCase__
* Promises are handled with __async functions__ using await
* I don't use var, only __const__ or __let__
* I put __spaces around operators__ ( = + - * / ) and after commas (exception for for loops)
* I use indentation with __TAB__
* I always end a statement with a __semi-colon;__
* Functions have their opening bracket on the __same line__ as the name, with 1 space in between
* I use __ES6 syntax__ where possible

## CSS code standards
* I try to avoid __!important__ as much as possible
* Layout/general styling is always __above__ more specific styling
* Selectors are not unnecessary __long__ nor __short__
* I use __CSS3 syntax__ where possible
* I avoid old display properties like float
* CSS Selectors must have a __space__ between the name and bracket

## HTML code standards
* I only use IDs when the element is present __once__ on a page and it's necessary for styling or Javascript
* I always write semantic HTML according to __W3C Validator__
* Divs are only used when __necessary__ for styling purposes
* Classes allow easy __re-usage__
* Indentation is always __clear__

# Packages used 📦
* [Express](https://www.npmjs.com/package/express) - Used to setup the server
* [Socket.io](https://socket.io/) - Used to make live connection with the server
* [Node Fetch](https://www.npmjs.com/package/node-fetch) - Used to fetch random word api
* [Nodemon](https://www.npmjs.com/package/nodemon) - Used for auto refreshing the server

# License 🔐
This project is licensed under the MIT license by © Inju Michorius, 2022. See the [LISENCE.md](https://github.com/InjuMichorius/ReadEar/blob/master/LICENSE) file for details.
