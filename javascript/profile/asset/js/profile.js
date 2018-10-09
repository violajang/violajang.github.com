const $NAME = document.querySelector('.name span');
const $GITHUBINFO = document.querySelector('.githubURL a');
const $INPUTTEXT = document.querySelector('.github-id');
const $PROFILE_PHOTO = document.querySelector('.photo-area');

const getInfo = (e) => {
  if (e.keyCode !== 13) return;
  const users = $INPUTTEXT.value;

  fetch(`https://api.github.com/users/${users}`)
    .then((res) => res.json())
    .then((data) => addValue(data));
};

const addValue = (user) => {
  $NAME.textContent = user.login;
  $GITHUBINFO.innerHTML = `<a href="${user.html_url}" target="_blank">${user.html_url}</a>`;
  $PROFILE_PHOTO.innerHTML = `<img src="${user.avatar_url}" />`;
};

window.onload = function() {
  $INPUTTEXT.addEventListener('keypress', getInfo);
};
