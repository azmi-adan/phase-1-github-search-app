// index.js
// index.js

// GitHub Search App

// Set API endpoint and headers
const apiEndpoint = 'https://api.github.com';
const headers = {
  'Accept': 'application/vnd.github.v3+json'
};

// Get search form and container elements
const searchForm = document.getElementById('github-form');
const searchInput = document.getElementById('search');
const userListElement = document.getElementById('user-list');
const reposListElement = document.getElementById('repos-list');
const githubContainer = document.getElementById('github-container');

// Add event listener to search form
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    searchUsers(searchTerm);
  }
});

// Search for users by keyword
function searchUsers(searchTerm) {
  const url = `${apiEndpoint}/search/users?q=${searchTerm}`;
  fetch(url, { headers })
    .then(response => response.json())
    .then(data => {
      const users = data.items;
      displayUsers(users);
    })
    .catch(error => console.error(error));
}

// Display user information
function displayUsers(users) {
  userListElement.innerHTML = '';
  users.forEach((user) => {
    const userElement = document.createElement('li');
    userElement.innerHTML = `
      <img src="${user.avatar_url}" alt="${user.login}">
      <a href="${user.html_url}">${user.login}</a>
    `;
    userElement.addEventListener('click', () => {
      searchRepos(user.login);
    });
    userListElement.appendChild(userElement);
  });
}

// Search for repositories by keyword
function searchRepos(username) {
  const url = `${apiEndpoint}/users/${username}/repos`;
  fetch(url, { headers })
    .then(response => response.json())
    .then(data => {
      const repos = data;
      displayRepos(repos);
    })
    .catch(error => console.error(error));
}

// Display repository information
function displayRepos(repos) {
  reposListElement.innerHTML = '';
  repos.forEach((repo) => {
    const repoElement = document.createElement('li');
    repoElement.innerHTML = `
      <a href="${repo.html_url}">${repo.name}</a>
    `;
    reposListElement.appendChild(repoElement);
  });
}

// Bonus feature: toggle search bar between searching for users and repositories
const searchTypeToggle = document.createElement('button');
searchTypeToggle.textContent = 'Search Repos';
githubContainer.appendChild(searchTypeToggle);

let searchType = 'users';

searchTypeToggle.addEventListener('click', () => {
  if (searchType === 'users') {
    searchType = 'repos';
    searchTypeToggle.textContent = 'Search Users';
  } else {
    searchType = 'users';
    searchTypeToggle.textContent = 'Search Repos';
  }
});

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    if (searchType === 'users') {
      searchUsers(searchTerm);
    } else {
      searchRepos(searchTerm);
    }
  }
});