'use strict';

const form = document.querySelector('#form-sign-in');
const errorSubmit = document.querySelector('#error-submit');
const checkBoxRemember = document.querySelector('#chxb-remember');

if (localStorage.getItem('email')) {
  document.querySelector('#inputEmail').value = localStorage.getItem('email');
  checkBoxRemember.checked = true;
}

form.onsubmit = async (e) => {
  e.preventDefault();

  //Pobieramy dane ze wszystkich pół w formie
  const data = new FormData(form);
  //Tworzymy słownik key-value dla nazwy pola i wartości wpisanej
  const entries = data.entries();
  //Tworzymy ze słownika obiekt, który łatwo możemy zamienić na JSON i wysłać
  const objData = Object.fromEntries(entries);

  //Wysyłamy w ciele żądania dane użytkownika
  try {
    //Najpierw pobieramy token

    let response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objData),
    });
    if (response.status === 422) {
      const result = await response.json();
      errorSubmit.innerHTML = `Something went wrong: ${result.error}`;
      errorSubmit.style.visibility = 'visible';
    } else {
      if (checkBoxRemember.checked === true) localStorage.setItem('email', objData.email);
      else localStorage.clear();
      location.href = response.url;
    }
  } catch (e) {
    console.log(e);
  }
};
