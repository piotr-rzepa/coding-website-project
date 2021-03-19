'use strict';

const form = document.querySelector('#form-sign-up');
const nickname = document.querySelector('#inputNickname');
const email = document.querySelector('#inputEmail');
const password = document.querySelector('#inputPassword');
const errorSubmit = document.querySelector('#error-submit');

import { Validator } from './client-side-validator.js';

//TODO: EVENT LISTENERY
nickname.addEventListener('input', (e) => {
  e.preventDefault();
  Validator.validate(nickname, Validator.regExpName);
});

email.addEventListener('input', (e) => {
  e.preventDefault();
  Validator.validate(email, Validator.regExpEmail);
});

password.addEventListener('input', (e) => {
  e.preventDefault();
  Validator.validate(password, Validator.regExpPassword);
});

form.onsubmit = async (e) => {
  e.preventDefault();
  //Pobieramy dane ze wszystkich pół w formie
  const data = new FormData(form);
  //Tworzymy słownik key-value dla nazwy pola i wartości wpisanej
  const entries = data.entries();
  //Tworzymy ze słownika obiekt, który łatwo możemy zamienić na JSON i wysłać
  const dataObj = Object.fromEntries(entries);

  //Wysyłamy w ciele żądania dane użytkownika
  try {
    let response = await fetch('/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObj),
    });

    if (response.status === 400) {
      const result = await response.json();
      errorSubmit.innerHTML = `Something went wrong: ${result.error}`;
      errorSubmit.style.visibility = 'visible';
      form.reset();
    } else location.href = response.url;
  } catch (error) {
    console.log('Error in creating account', e);
  }
};
