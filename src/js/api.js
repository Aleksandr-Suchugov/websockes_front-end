/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import Chat from './chat';
import Registration from './registration';

export default class API {
  constructor() {
    this.chat = new Chat();
    this.registration = new Registration();
    this.body = document.body;
    // this.ws = new WebSocket('ws:https://aleks-heroku.herokuapp.com/ws');
    this.ws = new WebSocket('ws://localhost:7070/ws');
    this.initWS();
  }

  initRegistration() {
    this.body.insertAdjacentHTML('afterbegin', this.registration.form());
    this.registrationForm = this.body.querySelector('.registration-form');
    this.registrationForm.addEventListener('click', (e) => this.sendUser(e));
  }

  initWS() {
    this.ws.addEventListener('open', () => console.log('Server is open'));
    this.ws.addEventListener('message', (e) => this.registrationSuccessListener(e));
    this.ws.addEventListener('message', (e) => this.registrationFailListener(e));
    this.ws.addEventListener('message', (e) => this.messageListener(e));
    this.ws.addEventListener('close', (e) => this.closeListener(e));
    this.ws.addEventListener('error', () => console.log('error'));
  }

  sendUser(e) {
    // console.log(e.target);
    this.username = this.registrationForm.querySelector('input').value;
    if (!e.target.classList.contains('registration-form__button') || this.username === '') return;
    this.request = {
      type: 'addUser',
      username: this.username,
    };
    this.ws.send(JSON.stringify(this.request));
  }

  sendMessage(message) {
    this.request = {
      type: 'sendMessage',
      username: this.username,
      text: message,
    };
    this.ws.send(JSON.stringify(this.request));
  }

  messageListener(e) {
    // console.log(e.data);
    if (e.data === 'Никнейм занят') return;
    this.response = JSON.parse(e.data);
    while (this.messages.firstChild) {
      this.messages.firstChild.remove();
    }
    for (const message of this.response) {
      this.name = this.username === message.name ? 'You' : message.username;
      this.messages.insertAdjacentElement('beforeend', this.chat.showMessage(this.name, message.text));
    }
    this.body.querySelector('input').value = '';
  }

  addChatListener(e) {
    // console.log(e.key);
    this.input = this.body.querySelector('input').value;
    if (e.key !== 'Enter' || this.input === '') return;
    this.sendMessage(this.input);
  }

  registrationSuccessListener(e) {
    if (e.data === 'Никнейм занят') return;
    this.response = JSON.parse(e.data);
    // console.log('ответ - ', this.response);
    this.registrationForm.remove();
    this.body.innerHTML = this.chat.render();
    document.addEventListener('keydown', (ev) => this.addChatListener(ev));
    this.chatEl = this.body.querySelector('.chat');
    this.members = this.chatEl.querySelector('.chat__members');
    this.messages = this.chatEl.querySelector('.chat__messages');
    for (const member of this.response) {
      // console.log(member.name);
      this.members.insertAdjacentHTML('beforeend', this.chat.showContactList(member.name));
    }
  }

  registrationFailListener(e) {
    // console.log(e.data);
    if (e.data !== 'Никнейм занят') return;
    this.response = e.data;
    this.initRegistration();
    this.body.insertAdjacentElement('afterbegin', this.registration.error(e.data));
    const errorMsg = document.querySelector('.error');
    setTimeout(() => errorMsg.remove(), 3000);
  }

  closeListener(e) {
    if (e.wasClean) {
      console.log(`Соединение закрыто, код ${e.code}, причина ${e.reason}`);
    }
    // this.ws = new WebSocket('wss://aleks-heroku.herokuapp.com/ws');
    this.ws = new WebSocket('ws://localhost:7070/ws');
    this.initWS();
  }
}
