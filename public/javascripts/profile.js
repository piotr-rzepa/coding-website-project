'use strict';

const profile = document.querySelector('#profile');
const logout = document.querySelector('#logout');
const addNewSolution = document.querySelector('#new-solution');
const allSolutions = document.querySelector('#all-solutions');

profile.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('/users/profile/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    location.href = response.url;
  } catch (e) {
    console.log(e);
  }
});

logout.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    location.href = response.url;
  } catch (e) {
    console.log(e);
  }
});
addNewSolution.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('/users/addSolution', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    location.href = response.url;
  } catch (e) {
    console.log(e);
  }
});

allSolutions.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('/user/solution/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    location.href = response.url;
  } catch (e) {
    console.log(e);
  }
});
