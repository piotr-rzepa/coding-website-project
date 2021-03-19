'use strict';

//Pobieramy id elementów tekstu oraz autora cytatu
const quoteText = document.querySelector('#quote-text');
const quoteAuthor = document.querySelector('#quote-author');

// eslint-disable-next-line no-unused-vars
const getRandomQuote = (async function () {
  try {
    //Pobieramy odpowiedź z API z cytatem
    let response = await fetch('http://quotes.stormconsultancy.co.uk/random.json');
    //Parsujemy aby otrzymać JSON
    const quoteObject = await response.json();
    //Destrukturyzacja
    const { author, quote } = quoteObject;
    quoteText.innerHTML = quote;
    quoteAuthor.innerHTML = author;
  } catch (error) {
    console.log('ERROR in fetching random quote API', error);
  }
})();
