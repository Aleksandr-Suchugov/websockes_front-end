/* eslint-disable class-methods-use-this */
export default class Chat {
  render() {
    return `
    <div class="chat">
      <div class="chat__messages"></div>
      <input type="text" class="chat__input">
      <div class="chat__members"></div>
    </div>`;
  }

  showMessage(name, message) {
    const msgEl = name === 'You' ? ' chat__message_you' : '';
    const nameEl = name === 'You' ? ' chat__name_you' : '';
    const entireMsgs = document.createElement('div');
    entireMsgs.className = `chat__message${msgEl}`;
    const entireNamesEl = document.createElement('div');
    entireNamesEl.className = `chat__name${nameEl}`;
    entireNamesEl.textContent = name + this.messageTimeStamp();
    const articleEl = document.createElement('div');
    articleEl.className = 'chat__article';
    articleEl.textContent = message;
    entireMsgs.insertAdjacentElement('afterbegin', entireNamesEl);
    entireMsgs.insertAdjacentElement('beforeend', articleEl);
    return entireMsgs;
  }

  messageTimeStamp() {
    const date = new Date();
    const formatterHours = new Intl.DateTimeFormat('ru', {
      hour: 'numeric',
      minute: 'numeric',
    });
    const formatterMonths = new Intl.DateTimeFormat('ru', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    return ` ${formatterHours.format(date)} ${formatterMonths.format(date)}`;
  }

  showContactList(name) {
    this.name = name;
    return `
    <div class="chat__member">
      <div class="chat__avatar"></div>
      <div class="chat__username">${this.name}</div>
    </div>`;
  }
}
