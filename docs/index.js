import * as timer from 'timer.js'

// gets the variables for the cookies
var cookie = document.getElementById('cookie')
var close = document.getElementById('close')

// deals with count
var counter = document.getElementById('count')
var count = 0

// game functions
function newCookie()
{
  var bot = randRange(10, 80)
  var left = randInt(50)
  var right = randInt(20)

  close.addEventListener('click', update)
  
  cookie.style = `position: fixed;
                  bottom: ${bot}%;
                  left: ${left}%;
                  right: ${right}%;
                  width: 50%;
                  display: flex`
}

function update()
{
  cookie.style = 'display: none'
  count++
  counter.innerHTML = `cookies clicked: ${count}`
  setTimeout(newCookie, 100)
}

// helper functions
function randInt(max) {
  return Math.floor(Math.random() * max)
}

function randRange(min, max) { 
  return Math.floor(Math.random() * (max - min) + min);
}

// initializes close button
close.addEventListener('click', update)