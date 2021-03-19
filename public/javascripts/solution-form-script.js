/* eslint-disable no-constant-condition */
'use strict';
const addBtn = document.querySelector('#btn-add-field');

const addElement = function () {
  //Wykorzystuje fakt, że funkcje w JS są również obiektami
  if (typeof addElement.counter == 'undefined') {
    //Tworzę sztuczną statyczną zmienną, która przy każdym wywołaniu funkcji inkrementuje
    addElement.counter = 0;
  }

  //Pobieram id ostatniego elementu w formie
  const oldDiv = document.querySelector(`#ig-ele${addElement.counter}`);

  //Tworzę nowy element
  const newField = document.createElement('div');
  newField.classList.add('input-group', 'mb-2');

  //Dodaje id jako id ostatniego elementu + 1
  newField.id = `ig-ele${++addElement.counter}`;

  newField.innerHTML = `<div class="input-group-prepend";>\
  <div class="input-group-text">Line [${addElement.counter}]:</div>\
  </div>\
  <textarea class="form-control" style="white-space: pre-wrap;" id="exampleFormControlTextarea${addElement.counter}" rows="1" name="line${addElement.counter}">\
  </textarea>\
  <div class="input-group-prepend">
  <button type="button" class="btn btn-danger" onclick="removeElement(this.parentNode.parentNode)">&times;</button>
  </div>`;

  //Umieszczam nowy element jako siostrzeniec starego
  oldDiv.parentNode.insertBefore(newField, oldDiv.nextSibling);
};

//Usuwanie elementu
// eslint-disable-next-line no-unused-vars
const removeElement = function (ele) {
  ele.remove();

  //Zmniejszam indeks aby przy kolejnym wywołaniu addElement() odnosił się do poprzednika usuniętego elementu
  if (!typeof addElement.counter == 'undefined') {
    addElement.counter--;
  } else addElement.counter = 0;
};

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addElement();
});

//Do przekształcania wybranego języka na skrót, który rozpoznaje Prism
const transformLanguage = (lang) => {
  switch (lang) {
    case 'C++':
      return 'cpp';
    case 'Python':
      return 'python';
    case 'C#':
      return 'csharp';
    case 'Java':
      return 'java';
    case 'JavaScript':
      return 'javascript';
    case 'Haskell':
      return 'haskell';
    default:
      throw new Error('transformLanguage(), bad lang provided!');
  }
};

const form = document.querySelector('#sol-form');

form.onsubmit = async (e) => {
  e.preventDefault();
  //Pobieramy dane ze wszystkich pół w formie
  const data = new FormData(form);
  //Tworzymy słownik key-value dla nazwy pola i wartości wpisanej
  const entries = data.entries();
  //Tworzymy ze słownika obiekt, który łatwo możemy zamienić na JSON i wysłać
  const objData = Object.fromEntries(entries);

  //Do wydobycia wyłącznie linii z kodem (destrukturyzacja)
  // eslint-disable-next-line no-unused-vars
  const { inlineRadioOptions, tags, title, ...partialObj } = objData;

  let arr = [];
  //Tworzenie tablicy obiektów z tekstem poszczególnej linii
  for (let l of Object.entries(partialObj).map(([k, v]) => ({ [k]: v }))) {
    arr.push({ line: Object.values(l)[0].replace(/\n/g, '\n') });
  }

  console.log(arr);
  const body = {
    language: transformLanguage(objData.inlineRadioOptions),
    tags: objData.tags.split(','),
    title: objData.title,
    body: /*Object.entries(partialObj).map(([k, v]) => ({ [k]: v })), */ arr,
  };
  console.log(body);

  await fetch('/user/solution/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
