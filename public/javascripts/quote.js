'use strict';

//Pobieramy id elementów tekstu oraz autora cytatu
const quoteText = document.querySelector('#quote-text');
const quoteAuthor = document.querySelector('#quote-author');

// eslint-disable-next-line no-unused-vars
const getRandomQuote = (async function () {
  try {
    //Pobieramy odpowiedź z API z cytatem
    let response = await fetch('https://private-anon-39966be192-goquotes.apiary-proxy.com/api/v1/random?count=1');
    //Parsujemy aby otrzymać JSON
    const quoteObject = await response.json();
    //Destrukturyzacja
    const { author, text } = quoteObject.quotes[0];
    quoteText.innerHTML = text;
    quoteAuthor.innerHTML = author;
  } catch (error) {
    console.log('ERROR in fetching random quote API', error);
  }
})();
