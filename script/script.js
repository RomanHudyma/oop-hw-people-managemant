const usersArray = [];

class SuperUser {
  constructor(userInfo) {
    this.name = userInfo.name;
    this.sex = userInfo.sex;
    this.birthdate = userInfo.birthdate;
    this.address = userInfo.address;
    this.phone = userInfo.phone;
    this.email = userInfo.email;
    this.isDataVisible = true;
  }

  changeDataVisibility() {
    if (this.isDataVisible === true) {
      this.isDataVisible = false;
    } else {
      this.isDataVisible = true;
    }
    return this.isDataVisible;
  }
}

class User extends SuperUser {
  constructor(userInfo) {
    super(userInfo);
    this.isDataVisible = true;
  }

  changeDataVisibility() {
    super.changeDataVisibility();
  }
}

function createNewElement(tag, attr) {
  const newEl = document.createElement(tag);
  Object.keys(attr).forEach((key) => {
    newEl.setAttribute(key, attr[key]);
  });
  return newEl;
}

function renderUserInfo(id, userInfo) {
  const newRow = createNewElement('tr', { id: `userId-${id}` });
  let colVal;
  Object.keys(userInfo).forEach((key) => {
    if (key === 'name') {
      colVal = createNewElement('td', { class: `${key}` });
    } else {
      colVal = createNewElement('td', { class: `${key} hidden` });
    }
    colVal.innerText = `${userInfo[key]}`;
    newRow.insertAdjacentElement('beforeend', colVal);
  });
  newRow.addEventListener('click', () => {
    const elemsToChangeVisibility = document.querySelectorAll(`#userId-${id}  .hidden`);
    if (usersArray[id].isDataVisible) {
      for (let i = 0; i < elemsToChangeVisibility.length; i += 1) {
        elemsToChangeVisibility[i].style.visibility = 'hidden';
      }
    } else {
      for (let i = 0; i < elemsToChangeVisibility.length; i += 1) {
        elemsToChangeVisibility[i].style.visibility = 'visible';
      }
    }
    usersArray[id].changeDataVisibility();
  });
  document.getElementById('table').insertAdjacentElement('beforeend', newRow);
}

function getUserInfo() {
  const userInfo = {};
  userInfo.name = document.getElementById('name').value;
  userInfo.sex = document.getElementById('sex').value;
  userInfo.birthdate = document.getElementById('birthdate').value;
  userInfo.address = document.getElementById('address').value;
  userInfo.phone = document.getElementById('phone').value;
  userInfo.email = document.getElementById('email').value;
  return userInfo;
}

function clearForm() {
  document.getElementById('name').value = '';
  document.getElementById('sex').value = '';
  document.getElementById('birthdate').value = '';
  document.getElementById('address').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('email').value = '';
}

function addNewUser(e) {
  e.preventDefault();
  usersArray.push(new User(getUserInfo()));
  renderUserInfo(usersArray.length - 1, getUserInfo());
  clearForm();
}

const saveButton = document.getElementById('save');

saveButton.addEventListener('click', addNewUser);
