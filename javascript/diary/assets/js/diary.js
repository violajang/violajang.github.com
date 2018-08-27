//내용 담을 변수 미리 선언
const inputText = document.querySelector('.new-diary');
const textList = document.querySelector('.diary-list');

const addList = function(e) {
  //keycode 13은 'enter','return' key
  if (e.keyCode !== 13) return;

  const list = document.createElement('li');
  const text = e.target.value;

  list.textContent = text;

  textList.appendChild(list);
  inputText.value = '';
}

inputText.addEventListener('keypress', addList);