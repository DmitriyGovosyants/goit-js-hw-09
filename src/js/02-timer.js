import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    startBtn: document.querySelector('[data-start]'),
    input: document.querySelector('#datetime-picker'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    easyTimer.calculateCountdownTime(selectedDates);
  },
};
const fp = flatpickr("#datetime-picker", options);

class CountdownTimer {
    constructor({onTick, startBtn, input}) {
        this.countdownTime = 0;
        this.countdownID = null;
        this.onTick = onTick;
        this.startBtn = startBtn;
        this.input = input;
    }

    calculateCountdownTime(selectedDates) {
        const currentTime = Date.now();
        const selectedTime = selectedDates[0].getTime();

        if (selectedTime < currentTime) {
            return Notify.failure("Please choose a date in the future");
        }

        this.countdownTime = selectedTime - currentTime;
        this.startBtn();
    }

    countdownStart() {
        this.countdownID = setInterval(() => {
            if (this.countdownTime < 0) {
                return clearInterval(this.countdownID);
            }

            const time = this.convertMs(this.countdownTime);
            this.onTick(time);
            this.countdownTime -= 1000;
        }, 1000)

        this.startBtn();
        this.input();
    }

    convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = this.addLeadingZero(Math.floor(ms / day));
        const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
        const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
        const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds };
    }

    addLeadingZero(value) {
        return String(value).padStart(2, "0");
    }
}

const easyTimer = new CountdownTimer({onTick: updateCountdown, startBtn: startBtnDisabledToggle, input: inputDisabledToggle});

refs.startBtn.disabled = true;
refs.input.disabled = false;

refs.startBtn.addEventListener('click', () => easyTimer.countdownStart());

function updateCountdown({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}

function startBtnDisabledToggle() {
    refs.startBtn.disabled = !refs.startBtn.disabled;
}

function inputDisabledToggle() {
    refs.input.disabled = !refs.input.disabled;
}