class View {
  constructor() {
    this.app = document.getElementById('app');

    this.title = this.createElement('h1','title');
    this.title.textContent = 'Github Search User';

    this.searchLine = this.createElement('div','search-line');
    this.searchInput = this.createElement('input','search-input');
    this.searchCounter = this.createElement('span','counter');
    this.searchLine.append(this.searchInput);
    this.searchLine.append(this.searchCounter);


    this.usersWrapper = this.createElement('div', 'users-wrapper');
    this.usersList = this.createElement('ul','users');
    this.usersWrapper.append(this.usersList);

    this.main = this.createElement('div','main');
    this.main.append(this.usersWrapper);

    this.loadMore = this.createElement('button','btn');
    this.loadMore.textContent = "Загрузить еще";
    this.usersWrapper.append(this.loadMore);

    this.app.append(this.title);
    this.app.append(this.searchLine);
    this.app.append(this.main);
    this.app.append(this.usersWrapper);

  }
  createElement(elementTag, elementClass){
    const element = document.createElement(elementTag);
    if(elementClass){ element.classList.add(elementClass)}
    return element
  }
  createUser(userData) {
    const userElement = this.createElement('li','user-prev');
    userElement.innerHTML = `<img class="user-prev-photo" src="${userData.avatar_url}" alt="${userData.login}"> 
                             <span class="user-prev-name">${userData.login}</span>`;
    this.usersList.append(userElement);
  }

}

const USER_PER_PAGE = 20;


class Search {

  setCurrentPage(pageNumber){
    this.currentPage = pageNumber;
  }

  constructor(view) {
    this.view = view;

    this.view.searchInput.addEventListener('keyup', this.loadUsers.bind(this));
    this.view.loadMore.addEventListener('click',this.loadUsers.bind(this));
    this.currentPage = 1;
  }

  async loadUsers() {
    return await fetch(`https://api.github.com/search/users?q=${this.view.searchInput.value}&per_page=${USER_PER_PAGE}&page=${this.currentPage}`).then((res) => {
      if (res.ok) {
        this.setCurrentPage(this.currentPage + 1);
        res.json().then(res => {
          res.items.forEach(user => this.view.createUser(user))
        })
      } else {

      }
    });
  }

}

new Search(new View());