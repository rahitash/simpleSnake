const box = document.getElementById("box")
let squares = []
let snake = [2,1,0]
const box_width = 500;
const square_width = 20;
const square_count = box_width/square_width
let interval = 800;
const speed = 0.9;
let direction = 1
let alive = false
let appleIndex = 0
let score = 0
const scoreDisplay = document.getElementById("score")
const startButton = document.getElementById("start")
const restartButton = document.getElementById("restart")
const pauseButton = document.getElementById("pause")
let timerID = null
let gamePaused = false


startButton.addEventListener("click", start)
restartButton.addEventListener("click", restart)
pauseButton.addEventListener("click", pause)


//The squares are created and pushed into the squares array

for (let i = 0; i < (box_width*box_width)/(square_width*square_width); i++) {

  let newSquare = document.createElement("div")

  newSquare.classList.add("square")

  box.appendChild(newSquare)

  squares.push(newSquare)

}

snake.forEach(index => squares[index].classList.add("snake"))




// Listen to arrow keys and change snake direction
document.addEventListener("keyup", function(e) {

  if (e.key === "ArrowRight" || e.key === "d") {
    direction = 1
  } else if(e.key === "ArrowLeft" || e.key === "a") {
    direction = -1
  } else if(e.key === "ArrowDown" || e.key === "s") {
    direction = square_count
  } else if(e.key === "ArrowUp" || e.key === "w") {
    direction = -square_count
  }

})


// Moves the snake
function move() {

  // Handing when the snake touches the boundaries or collide itself
  if (direction === 1 && snake[0] % square_count === square_count - 1 ||
      direction === -1 && snake[0] % square_count === 0 ||
      direction === square_count && square_count*square_count - snake[0] <= square_count ||
      direction === -square_count && snake[0] < square_count ||
      squares[snake[0] + direction].classList.contains("snake")) {
        document.querySelector("h1").textContent = "Game Over"
        pauseButton.style.display = "none"
        return clearInterval(timerID)
      }


    snake.unshift(snake[0] + direction)
    const poppedSnake = snake.pop()
    squares[poppedSnake].classList.remove("snake")
    //console.log(snake)
    snake.forEach(index => squares[index].classList.add("snake"))

    // Handling when the snake eats the apple

    if (appleIndex === snake[0]) {

      // Add and display score
      score++
      scoreDisplay.textContent = score

      // Remove the current apple and regenerate one
      squares[appleIndex].classList.remove("apple")
      generateApple()

      // Make the snake longer
      snake.push(poppedSnake)
      squares[poppedSnake].classList.add("snake")

      // Make the snake move faster
      clearInterval(timerID)
      interval = interval*speed
      timerID = setInterval(move, (interval))
    }

}

function generateApple() {

    appleIndex = Math.floor(Math.random() * (box_width*box_width)/(square_width*square_width))

    while (squares[appleIndex].classList.contains("snake")) {
      appleIndex = Math.floor(Math.random() * (box_width*box_width)/(square_width*square_width))
    }

    squares[appleIndex].classList.add("apple")

}

function start() {
  // Calls the move function
  timerID = setInterval(move , interval)
  generateApple()
  restartButton.style.display = "inline-block"
  pauseButton.style.display = "inline-block"
  startButton.style.display = "none"

}


function restart() {

  snake.forEach(index => squares[index].classList.remove("snake"))
  squares[appleIndex].classList.remove("apple")

  snake = [2,1,0]
  interval = 1000;
  direction = 1
  appleIndex = 0
  score = 0

  clearInterval(timerID)
  scoreDisplay.textContent = score
  document.querySelector("h1").textContent = "Snake"
  snake.forEach(index => squares[index].classList.add("snake"))
  start()

}

function pause() {

  if (gamePaused) {
    timerID = setInterval(move, interval)
    gamePaused = false
    pauseButton.textContent = "Pause"
  } else {
    clearInterval(timerID)
    gamePaused = true
    pauseButton.textContent = "Resume"
  }



}
