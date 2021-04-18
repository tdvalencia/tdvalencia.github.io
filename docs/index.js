// gets the variables for the cookies
var cookie = document.getElementById('cookie0')
var close = document.getElementById('close0')

// deals with count
var counter = document.getElementById('count')
var count = 0

// game functions
function newCookie()
{
  var rand = randInt(2)

  cookie = document.getElementById('cookie' + rand)
  close = document.getElementById('close' + rand)
  close.addEventListener('click', update)
  
  cookie.style = 'display: flex'
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

// initializes close button
close.addEventListener('click', update)