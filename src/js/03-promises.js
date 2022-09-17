import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnEl: document.querySelector('button'),
  formEl: document.querySelector('.form'),

  // inputDelayEl: document.querySelector('input[name="delay"]'),
  // inputStepEl: document.querySelector('input[name="step"]'),
  // inputAmountEl: document.querySelector('input[name="amount"]'),

}

refs.formEl.addEventListener('click', onClick);

function onClick(evt) {
  evt.preventDefault();

  if (evt.target.tagName !== 'BUTTON') {
    return;
  } 

  let {
    elements: { delay, step, amount },
  } = evt.currentTarget;
 
 let amountValue = Number(amount.value);
 let firstDelay = Number(delay.value);
 let stepValue = Number(step.value);

  // console.log(firstDelay);
  // console.log(stepValue);
  // console.log(amountValue);

 delay = firstDelay;

for (let position = 1; position <= amountValue; position += 1) {
  createPromise({ position, delay })
    .then(({position, delay}) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  })
delay += stepValue; 
}

  
function createPromise({position, delay}) {  

  return new Promise((resolve, reject) => {
    setTimeout(() => {
    const shouldResolve = Math.random() > 0.3; 
      // console.log(shouldResolve);  
      if (shouldResolve) {
        // Fulfill   
        resolve({ position, delay });
      }
        // Reject
        reject({ position, delay });
    }, delay);
  });
}
