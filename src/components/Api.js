class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
    this._headers = {
      authorization: this._authToken,
      'Content-type': 'application/json',
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  // GET all cards from server
  // GET //https://around.nomoreparties.co/v!/group-12/cards"
  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // GET user info from server
  // GET //https://around.nomoreparties.co/v!/group-12/users/me"
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // PATCH new user info to the server
  // PATCH //https://around.nomoreparties.co/v!/group-12/users/me"
  async addUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  // POST new card to display using 'new place' popup form
  // POST //https://around.nomoreparties.co/v!/group-12/cards"
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  // POST change to the server
  // POST //https://around.nomoreparties.co/v!/group-12/cards/cardId"
  removeCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // add a like to a card
  // PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  addLike(_id) {
    return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // remove a like from a card
  // DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  removeLike(_id, name) {
    return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // add new avatar
  // PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
  addAvatar({ avatarLink }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._checkResponse);
  }
}

export default Api;
