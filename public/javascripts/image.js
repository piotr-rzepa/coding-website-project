'use strict';
//Pobieramy id elementów tekstu oraz autora cytatu
const image = document.querySelector('#img-API');

// eslint-disable-next-line no-unused-vars
const getRandomImg = (async function () {
  try {
    //Pobieramy odpowiedź z API ze zdjęciem
    let response = await fetch('https://random.imagecdn.app/400/400');

    image.src = response.url;
  } catch (error) {
    console.log('ERROR in fetching random image API', error);
  }
})();
