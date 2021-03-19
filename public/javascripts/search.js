const searchBtn = document.querySelector('#button-search');

searchBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const search = document.querySelector('#editText-search').value.trim();
  location.href = `/home/page1?title=${search}`;
});
