const up = document.getElementById("up");
const down = document.getElementById("down");
const left = document.getElementById("left");
const right = document.getElementById("right");
const eat = document.getElementById("eat");
const gameOver = document.getElementById("gameOver");
const song = document.getElementById("song");
const audio = document.getElementById("audio");
const nav = document.querySelector("nav");
const img = new Image()
const orange = new Image()
const brick = new Image()

const canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
const p = document.getElementById("score");
const p1 = document.getElementById("bestScore");
let score = 0;
let easyScore = 0
let mediumScore = 0
let hardScore = 0
p.innerHTML = 0;
let level = "easy";
let arr = []
let direction
let interval;
let color = "antiqueWhite"
let mudo = false
const size = 25;
let snake
let food = { x: 0, y: 0 };

const drawSnake = () => {
    let head = snake[snake.length - 1];
    ctx.fillStyle = color;
    snake.forEach((position, index) => {
        if (head.x > 600) {
            head.x = size;
        }
        if (head.x < 0) {
            head.x = 600 - size;
        }
        if (head.y > 600) {
            head.y = size;
        }
        if (head.y < 0) {
            head.y = 600 - size;
        }
        if (index == snake.length - 1) {
            ctx.strokeRect(position.x, position.y, size, size);
            ctx.strokeStyle = "color";
        }
        ctx.fillRect(position.x, position.y, size, size);
    })
}
const drawHead = () => {
    let head = snake[snake.length - 1];
    let x = head.x 
    let y = head.y
    img.src = "./src/images/eyes.png"
    ctx.beginPath()
    ctx.drawImage(img, x + 5, y - 5, 15, 15)
    ctx.closePath()
}
const drawFood = () => {
    let head = snake[snake.length - 1];
    snake.forEach((position) => {
        if (position == head) {
            position = 0
        }
        if (food.x == position.x && food.y == position.y) {
            sortear()
        } else {
            orange.src = "./src/images/orange.png"
            ctx.drawImage(orange, food.x, food.y, 25, 25)
        }
    })
}
const drawWall = () => {
    let head = snake[snake.length - 1];
    brick.src = "./src/images/brick.jpg"
    if (level == "medium") {
        for(let i = 0; i <= 600; i = i + size) {
            ctx.drawImage(brick, i, 0, size, size)
            if (food.x == i && food.y == 0) {
                sortear()
            }
            if (head.x == i && head.y == 0) {
                finishGame()
            }
        }
        for( let i = 0; i <= 600; i = i + size) {
            ctx.drawImage(brick, 0, i, size, size)
            if (food.x == 0 && food.y == i) {
                sortear()
            }
            if (head.x == 0 && head.y == i) {
                finishGame()
            }
        }
        for(let i = 0; i <= 600; i = i + size) {
            ctx.drawImage(brick, i, 575, size, size)
            if (food.x == i && food.y == 575) {
                sortear()
            }
            if (head.x == i && head.y == 575) {
                finishGame()
            }
        }
        for(let i = 0; i <= 600; i = i + size) {
            ctx.drawImage(brick, 575, i, size, size)
            if (food.x == 575 && food.y == i) {
                sortear()
            }
            if (head.x == 575 && head.y == i) {
                finishGame()
            }
        }
    }
    if (level == "hard") {
        for( let i = 200; i <= 400; i = i + size) {
            ctx.drawImage(brick, i, 150, size, size)
            if (food.x == i && food.y == 150) {
                sortear()
            }
            if (head.x == i && head.y == 150) {
                finishGame()
            }
        }
        for( let i = 200; i <= 400; i = i + size) {
            ctx.drawImage(brick, i, 400, size, size)
            if (food.x == i && food.y == 400) {
                sortear()
            }
            if (head.x == i && head.y == 400) {
                finishGame()
            }
        }
    }
}
const numbers = () => {
    let n = 0;
    for (let i = 0; i <= 575; i = i + 25){
        arr[n] = i;
        n = n + 1;
    }
}
const sortear = () => {
    numbers()
    let randomElementx = arr[Math.floor(Math.random() * arr.length)];
    let randomElementy = arr[Math.floor(Math.random() * arr.length)];
    food.x = randomElementx
    food.y = randomElementy
}

const moveSnake = () => {
    let head = snake[snake.length - 1];
    if (direction == "right") {
        snake.shift();
        snake.push({x: head.x + size, y: head.y});
        drawSnake();
    }
    if (direction == "left") {
        snake.shift();
        snake.push({x: head.x - size, y: head.y});
        drawSnake();
    }
    if (direction == "up") {
        snake.shift();
        snake.push({x: head.x, y: head.y - size});
        drawSnake();
    }
    if (direction == "down") {
        snake.shift();
        snake.push({x: head.x, y: head.y + size});
        drawSnake();
    }
}
const toEat = () => {
    let head = snake[snake.length - 1];
    if (head.x == food.x && head.y == food.y) {
        sortear();
        setTimeout(() => {
            increaseSnake();
        }, 330)
        score = score + size;
        p.innerHTML = score;
        eat.playbackRate = 2
        eat.play()
        
    }
    
}
const increaseSnake = () => {
    let head = snake[snake.length - 1];
    if (direction == "up") {
        snake.push({x: head.x, y: head.y - size});
    }
    if (direction == "down") {
        snake.push({x: head.x, y: head.y + size});
    }
    if (direction == "left") {
        snake.push({x: head.x - size, y: head.y});
    }
    if (direction == "right") {
        snake.push({x: head.x + size, y: head.y});
    }
    
}
const verify = () => {
    let head = snake[snake.length - 1];
    let h1 = snake[snake.length - 2] 
    snake.forEach((position, index) => {
        if (position == head) {
            position = 0
        }
        if (head.x == position.x && head.y == position.y) {
            finishGame();
        }
        
    })
}
const finishGame = () => {
    song.pause()
    gameOver.play()
    nav.style.display = "flex";
    if (level == "easy") {
        if (score > easyScore) {
            easyScore = score
            p1.innerHTML = "Best score: " + easyScore;
        }
    }
    if (level == "medium") {
        if (score > mediumScore) {
            mediumScore = score
            p1.innerHTML = "Best score: " + mediumScore;
        }
    }
    if (level == "hard") {
        if (score > hardScore) {
            hardScore = score
            p1.innerHTML = "Best score: " + hardScore;
        }
    }
    
}
const toUp = () => {
    let head = snake[snake.length - 1];
    if (head.x >= 600 || head.y >= 600) {
        direction = direction
    } else {
        if (direction == "down") {
            directiin = direction
        }else {
            direction = "up";
            if (mudo == false) {
                song.play();
            }
        }
    }
}
const toDown = () => {
    let head = snake[snake.length - 1];
    if (head.x >= 600 || head.y >= 600) {
        direction = direction
    } else {
        if (direction == "up") {
            directiin = direction
        }else {
            direction = "down";
            if (mudo == false) {
                song.play();
            }
        }
    }
}
const toLeft = () => {
    let head = snake[snake.length - 1];
    if (head.x >= 600 || head.y >= 600) {
        direction = direction
    } else {
        if (direction == "right" || direction == 0) {
            directiin = direction
        }else {
            direction = "left";
        }
    }
}
const toRight = () => {
    let head = snake[snake.length - 1];
    if (head.x >= 600 || head.y >= 600) {
        direction = direction
    } else {
        if (direction == "left") {
            directiin = direction
        }else {
            direction = "right";
            if (mudo == false) {
                song.play();
            }
        }
    }
}
    
document.addEventListener("keydown", (e) => {
    if(e.key == "ArrowUp") {
        toUp()
    }
    if(e.key == "ArrowDown") {
        toDown()
    }
    if(e.key == "ArrowLeft") {
        toLeft()
    }
    if(e.key == "ArrowRight") {
        toRight()
    }
})
const moveUp = up.addEventListener('click', () => {
    toUp()
});
const moveDown = down.addEventListener('click', () => {
    toDown()
});
const moveLeft = left.addEventListener('click', () => {
    toLeft()
});
const moveRight = right.addEventListener('click', () => {
    toRight()
});
const playGame = play.addEventListener('click', () => {
    nav.style.display = "none";
    reiniciar()
})
const reiniciar = () => {
    snake = [
    { x: 200, y: 200 },
    { x: 225, y: 200 },
    { x: 250, y: 200 },
    { x: 275, y: 200 }
    ];
    direction = 0
    score = 0
    p.innerHTML = "0";
}
config.addEventListener("click", () => {
    aba.style.display = "flex";
    config.style.display = "none";
})
closeBtn.addEventListener("click", () => {
    aba.style.display = "none";
    config.style.display = "flex";
})
btnAudio.addEventListener("click", () => {
    btnAudio.style.display = "none"
    btnMudo.style.display = "flex"
    song.pause()
    mudo = true;
})
btnMudo.addEventListener("click", () => {
    btnAudio.style.display = "flex"
    btnMudo.style.display = "none"
    song.play()
    mudo = false;
})
color1.addEventListener("click", () => {
    color = "antiqueWhite";
})
color2.addEventListener("click", () => {
    color = "red";
})
color3.addEventListener("click", () => {
    color = "green";
})
color4.addEventListener("click", () => {
    color = "lightblue";
})
color5.addEventListener("click", () => {
    color = "pink";
})
color6.addEventListener("click", () => {
    color = "gray";
})
easy.addEventListener("change" , () => {
    level = "easy";
    p1.innerHTML = "Best score: " + easyScore;
})
medium.addEventListener("change" , () => {
    level = "medium";
    p1.innerHTML = "Best score: " + mediumScore;
})
hard.addEventListener("change" , () => {
    level = "hard";
    p1.innerHTML = "Best score: " + hardScore;
})
setInterval(() => {
    ctx.clearRect(0, 0, 600, 600);
    moveSnake();
    drawSnake();
    drawHead();
    drawFood();
    if (nav.style.display == "none") {
        drawWall();
    }
    toEat();
    verify();
}, 130)
sortear()