const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]')
}
const COLOR_CHANGE_TIME = 1000;

refs.startBtn.addEventListener('click', onBodyColorChange);
refs.stopBtn.addEventListener('click', onBodyColorStopChange);

function onBodyColorChange() {
    changeColorTimerID = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, COLOR_CHANGE_TIME);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
}

function onBodyColorStopChange() {
    clearInterval(changeColorTimerID);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}