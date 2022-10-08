/* eslint-disable class-methods-use-this */
export default class Registration {
  form() {
    return `
    <form class="registration-form">
      <div class="registration-form__title">Выберите псевдоним</div>
      <input placeholder="Введите псевдоним..." type="text" class="registration-form__input">
      <button type="button" class="registration-form__button">Продолжить</button>
    </form>`;
  }

  error(error) {
    this.error = error;
    const errorEl = document.createElement('div');
    errorEl.className = 'error';
    const titleEl = document.createElement('div');
    titleEl.className = 'error__title';
    const msgEl = document.createElement('div');
    msgEl.className = 'error__message';
    titleEl.textContent = this.error;
    msgEl.textContent = 'Введите другой никнейм';
    errorEl.insertAdjacentElement('afterbegin', titleEl);
    errorEl.insertAdjacentElement('beforeend', msgEl);
    return errorEl;
  }
}
