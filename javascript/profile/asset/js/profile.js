let githubInfo = {};
const $NAME = document.querySelector('.name span');
const $GITHUBINFO = document.querySelector('.githubURL a');
const $INPUTTEXT = document.querySelector('.github-id');
const $PROFILE_PHOTO = document.querySelector('.photo-area');

const getInfo = function() {
  let id = $INPUTTEXT.value;
  fetch(`https://api.github.com/users/${id}`)
    .then((data) => data.json())
    .then((data) => (githubInfo = data));
};

window.onload = function() {
  const addValue = function(e) {
    //keycode 13은 'enter','return' key
    if (e.keyCode !== 13) return;

    $NAME.textContent = githubInfo.login;
    $GITHUBINFO.innerHTML = `<a href="${githubInfo.html_url}" target="_blank">${githubInfo.html_url}</a>`;
    $PROFILE_PHOTO.innerHTML = `<img src="${githubInfo.avatar_url}" />`;
  };

  $INPUTTEXT.addEventListener('keyup', getInfo);
  $INPUTTEXT.addEventListener('keypress', addValue);
};
