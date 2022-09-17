
const refs = {
    btnStartEl: document.querySelector('button[data-start]'),
    btnStopEl: document.querySelector('button[data-stop]'),
    bodyEl: document.querySelector('body'),
}

// console.log(refs.btnStartEl);
// console.log(refs.btnStartEl);
// console.log(refs.bodyEl);

refs.btnStartEl.addEventListener('click', onStartChangeColorClick);
refs.btnStopEl.addEventListener('click', onStopChangeColorClick);

let timerId;
let isActive = false;

ActiveBtn();

function onStartChangeColorClick() {
    if (isActive) { 
        return;
    }
    // console.log('Start');
    isActive = true;
    notActiveBtn();
    timerId = setInterval(() => {
    let randomColor = getRandomHexColor();  
    // console.log('time', Date.now());
    // console.log('randomColor', randomColor);        
    refs.bodyEl.style.backgroundColor = randomColor;
}, 1000);
}

function onStopChangeColorClick() {
    isActive = false;
    ActiveBtn();
    // console.log('Stop');
    clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function ActiveBtn(){
  refs.btnStartEl.removeAttribute("disabled", "true");
  refs.btnStartEl.classList.remove('disabled');
    
  refs.btnStopEl.setAttribute("disabled", "true");    
  refs.btnStopEl.classList.add('disabled');

}
function notActiveBtn(){
  refs.btnStartEl.setAttribute("disabled", "true");
  refs.btnStartEl.classList.add('disabled');

  refs.btnStopEl.removeAttribute("disabled", "true");    
  refs.btnStopEl.classList.remove('disabled');
}


