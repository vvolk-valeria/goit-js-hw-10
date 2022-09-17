import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
require("flatpickr/dist/themes/dark.css");
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const LOCAL_KEY = 'selectedDate';

const refs = {
  btnStartEl: document.querySelector('button[data-start]'),
  timerEl: document.querySelector('.timer'),
  inputEl: document.querySelector('#datetime-picker'),

  daysValueEl: document.querySelector('span[data-days]'),
  hoursValueEl: document.querySelector('span[data-hours]'),
  minutesValueEl: document.querySelector('span[data-minutes]'),
  secondsValueEl: document.querySelector('span[data-seconds]'),
}

const options = {
  enableTime: true,
  time_24hr: true,
  // defaultDate: new Date(),
  defaultDate:Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0].getTime());
    // onCheck(selectedDates[0]);
    onCheck(selectedDates[0].getTime());
  },   
};

flatpickr("#datetime-picker", options);

refs.btnStartEl.addEventListener('click', startTimer);

//* активная/неактивная кнопка Start, поле даты
notActiveBtn();
function onCheck(selectedDate) { 
  if (selectedDate < options.defaultDate) {
    notActiveBtn();
    // window.alert("Please choose a date in the future"); 
    Notify.failure('Please choose a date in the future', {timeout: 2000, width: '360px'});
    // localRemoveDate(selectedDate);
    localRemoveDate(LOCAL_KEY);
  } else {
    localSaveDate(LOCAL_KEY, selectedDate);
    ActiveBtn();
}
}

// * активная/неактивная кнопка/поле
function ActiveBtn(){
  refs.btnStartEl.removeAttribute("disabled", "true");
  refs.btnStartEl.classList.remove('disabled');
}
function notActiveBtn(){
  refs.btnStartEl.setAttribute("disabled", "true");
  refs.btnStartEl.classList.add('disabled');
}
function notActiveInput(){
  refs.inputEl.setAttribute("disabled", "true");
  refs.inputEl.classList.add('disabled');
}

//* локальное хранилище
function localSaveDate(key, time) {
  localStorage.setItem(key, time);
}
// function localGetDate(key) {
//   localStorage.getItem(key);
// }
function localRemoveDate(key) {
  localStorage.removeItem(key);
}

//* таймер
function startTimer(selectedDates) {
  const savedTime = localStorage.getItem(LOCAL_KEY);
  // const savedTime = new Date(localStorage.getItem(LOCAL_KEY));

  if (!savedTime) {
    console.log('пропускаем');
    return;
  }
    else {

    notActiveBtn();
    notActiveInput();
    localRemoveDate(LOCAL_KEY);  
    // console.log('savedTime', savedTime);
    // console.log('Date.now()', Date.now());

    const IntervalId = setInterval(() => {
    const startTime = Date.now();
    const currentTime = savedTime;
    const deltaTime =  currentTime - startTime; 
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    // console.log('currentTime', currentTime);
    // console.log('startTime', startTime);

    if (deltaTime < 0) {
      clearInterval(IntervalId);
      Notify.success('The wait is over!', {timeout: 2000, width: '360px'});
      return;
    }
      changeTimerFace({ days, hours, minutes, seconds });
  }, 1_000);
  }
}

function changeTimerFace({ days, hours, minutes, seconds }) {
  refs.daysValueEl.textContent = days;
  refs.hoursValueEl.textContent = hours;
  refs.minutesValueEl.textContent = minutes;
  refs.secondsValueEl.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}








