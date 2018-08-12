/*const $ = (dom) =>{
    return dom.length > 2 
    ? Array.from(document.querySelectorAll(dom))
    : document.querySelector(dom);
};*/

const numValue = document.querySelector('.couter-value');
const plusCount = document.querySelector('.increment');
const minusCount = document.querySelector('.decrement');
const resetCount = document.querySelector('.reset');

let num = 0;

const counter = () => {

  const content = () => {
    numValue.textContent = num;
  }

  const increment = () => {
    num++;
    content();
  }

  const decrement = () => {
    if (num === 0) return;
    num--;
    content();
  }

  const resetNum = () => {
    num = 0;
    content();
  }

  plusCount.addEventListener('click', increment);
  minusCount.addEventListener('click', decrement);
  resetCount.addEventListener('click', resetNum);
}

counter();