const socket = io('/chattings');
const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

//* global socket handler
socket.on('user_connected', (username) => {
  drawNewChat(`🎉${username}님이 접속하셨습니다. 모두들 환영해주세요🎉`);
});
socket.on('new_chat', (data) => {
  const { chat, username } = data;
  drawNewChat(`${username} : ${chat}`);
});
socket.on('disconnect_user', (username) =>
  drawNewChat(`${username}님이 퇴장하셨습니다. 💤`),
);

//* event callback functions
const handleSubmit = (event) => {
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    // 브라우저에 나타내기
    drawNewChat(`${inputValue}`, true);
    event.target.elements[0].value = '';
  }
};

//* draw functions
const drawHelloStranger = (username) =>
  (helloStrangerElement.innerText = `👻반가워요! ${username}`);
const drawNewSentChat = (message) => {
  const wrapperChatBox = document.createElement('div');
  wrapperChatBox.classList.add('sent-message');
  const chatBox = `
      <div>
        ${message}
      </div>
      `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};
const drawNewReceivedChat = (message) => {
  const wrapperChatBox = document.createElement('div');
  wrapperChatBox.classList.add('received-message');
  const chatBox = `
      <div>
        ${message}
      </div>
  `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};

const drawNewChat = (message, isSent) => {
  if (isSent) {
    drawNewSentChat(message);
  } else {
    drawNewReceivedChat(message);
  }
};

function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
  // 이벤트 연결
  formElement.addEventListener('submit', handleSubmit);
}

init();
