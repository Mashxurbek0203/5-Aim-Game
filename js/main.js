const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list');
let time = 0;
const btns = document.querySelectorAll('.time-btn');
const timer = document.querySelector('#time')
const timeWrapper = document.querySelector('.time-wrapper')
const board = document.querySelector('#board')
const modalBtn = document.querySelector('.header__btn')
const siteBody = document.querySelector('.body')
const modalCloseBtn = document.querySelector('.modal__close-btn')
const modal = document.querySelector('.modal')
const retryBtn = board.querySelector('.board__try-btn')
let score = 0

btns.forEach((btn) => {
    const btnTime = parseInt(btn.textContent)
    btn.dataset.time = btnTime
})
startBtn.addEventListener('click', event => {
    event.preventDefault();
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        screens[1].classList.add('up')
        time = parseInt(event.target.getAttribute('data-time'))
        startGame()
    }
})



function timeText(wrapper, text) {
    return wrapper.innerHtml = `00:${text}`
}


function startGame() {
    timeText(timer, time)
    if (time < 10) {
        timer.textContent = `00:0${time}`
    }
    createRandomCircle()
    setInterval(decreaseTime, 1000)
}

function decreaseTime() {
    if (time < 0) {
        finishGame()
    } else {
        let current = time--;
        timer.textContent = `00:${current}`
        if (current < 10) {
            timer.textContent = `00:0${current}`
        }

    }
}


function finishGame() {
    let playAgain = document.createElement('button')
    playAgain.type = 'button'
    board.classList.add('board-end')
    playAgain.classList.add('again-btn')
    playAgain.textContent = 'Поиграть ещё'
    board.append(playAgain)
    board.innerHTML = `<h1 class="title">Счет:<span class="primary">${score}</span></h1>`
    board.append(retryBtn)
    retryBtn.style.display = 'block'
    timeWrapper.innerHTML = 'Время вышло 😁.'
    retryBtn.addEventListener("click", () => {
        window.location.reload();
    })
}

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }

})


function createRandomCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle')
    const circleSize = getRandomNumber(10, 60)
    const { width, height } = board.getBoundingClientRect()
    const xDir = getRandomNumber(0, width - circleSize)
    const yDir = getRandomNumber(0, height - circleSize)
    circle.style.left = `${xDir}px`
    circle.style.top = `${yDir}px`
    circle.style.width = `${circleSize}px`
    circle.style.height = `${circleSize}px`
    board.append(circle);

}

function getRandomNumber(max, min) {
    return Math.round(Math.random() * (max - min) + min)
}

modalBtn.addEventListener("click", () => {
    siteBody.classList.add('body--active')
    modal.classList.add("modal--active")
})

siteBody.addEventListener('click', event => {
    if (event.target.matches('.body')) {
        siteBody.classList.remove('body--active')
        modal.classList.remove("modal--active")
    }
})

modalCloseBtn.addEventListener('click', () => {
    siteBody.classList.remove('body--active')
    modal.classList.remove("modal--active")
})