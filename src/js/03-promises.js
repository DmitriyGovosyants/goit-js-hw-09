import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({ useIcon: false, });

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
}

refs.form.addEventListener('submit', onClickCreatePromises);

function onClickCreatePromises(e) {
  e.preventDefault();

  const AMOUNT = +refs.amount.value;
  const DELAY = +refs.delay.value;
  const STEP = +refs.step.value;

  for (let i = 1; i <= AMOUNT; i += 1) {
    let stepForCurrentPromise = DELAY + STEP * (i - 1);
    
    createPromise(i, stepForCurrentPromise)
      .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }

  e.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  })
}