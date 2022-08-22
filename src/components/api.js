class Api {
    constructor({ baseUrl, authToken}) {
        this._baseUrl = baseUrl;
        this._authToken = authToken;
    }
// GET //https://around.nomoreparties.co/v!/group-12/cards"
getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
        method: "GET",
        headers: {
            authorization: this._authToken,
            "Content-type": "application/json",
        }
    })
    .then(res =>  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)  )
    .catch((err) => {
        console.log(err)
    });
}

// GET //https://around.nomoreparties.co/v!/group-12/users/me"
getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: {
            authorization: this._authToken,
            "Content-type": "application/json",
        }
    })
    .then(res =>  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)  )
    .catch((err) => {
        console.log(err)
    });
}

// POST //https://around.nomoreparties.co/v!/group-12/cards"
addCard( { name, link } ) {
    return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: {
            authorization: this._authToken,
            "Content-type": "application/json",
        },
        body: JSON.stringify( {
            name,
            link
      } )
    })
}

}


export default Api;

